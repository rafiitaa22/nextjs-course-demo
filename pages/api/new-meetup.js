import { MongoClient } from "mongodb";
// /api/new-meetup

async function handler(req, res) {
  //podemos obtener headers, request body, method,...
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://admin:IsLPRTCcp0SSDrvP@cluster0.38wvapm.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" }); //201: insertado success
  }
}

export default handler;
