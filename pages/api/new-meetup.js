import { MongoClient } from "mongodb";

// /api/new-meetup'

const dev_db = process.env.DEV_DB;

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { titel, image, address, description } = data;

    const client = await MongoClient.connect(dev_db);

    const db = client.db("dev");

    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup created!!" });
  }
}

export default handler;
