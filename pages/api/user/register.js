import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();


  const dbResp = await db
  .collection("users")
  .insertOne({
    username: req.query.username,
    password: req.query.password,
    favorite: req.query.favorite,

  })

res.json(dbResp);
};