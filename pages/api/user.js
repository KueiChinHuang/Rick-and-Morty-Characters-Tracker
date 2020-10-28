import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const dbResp = await db
      .collection("users")
      .insertOne({
        username: req.query.username,
        password: req.query.password
      })
    
    res.json(dbResp);

  } else {
    const user = await db
      .collection("users")
      .find({
        username: req.query.username,
        password: req.query.password
      })
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();
  
    res.json(user);
  }
};