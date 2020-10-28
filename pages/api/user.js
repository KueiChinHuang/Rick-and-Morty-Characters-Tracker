import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    console.log(req)
  const { db } = await connectToDatabase();

  const user = await db
    .collection("users")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(user);
};