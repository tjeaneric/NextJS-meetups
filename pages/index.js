import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_LIST = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "KK 123 St.",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "KK 666 St.",
    description: "This iA first meetups a second meetup",
  },
];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Next Js Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of of highly active Next meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   //fetch data from an API
//   const req = context.req;
//   const resp = context.res;
//   return {
//     props: { meetups: DUMMY_LIST },
//   };
// }

const dev_db = process.env.DEV_DB;

export async function getStaticProps() {
  const client = await MongoClient.connect(dev_db);

  const db = client.db("dev");

  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
