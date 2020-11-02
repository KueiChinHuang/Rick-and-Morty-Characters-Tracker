import Axios from "axios";
import User from "../../../../models/User";
import dbConnect from "../../../../util/dbConnect";

dbConnect();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  try {
    const user = await User.findById(id);
    const favIDs = user.favorite;
    let favData = [];

    for (let i in favIDs) {
      const charResp = await Axios.get(
        `https://rickandmortyapi.com/api/character/${favIDs[i]}`
      );
      const charData = await charResp.data;
      favData = [...favData, charData];
    }

    res.status(200).json({ success: true, favIDs, favData });
  } catch (error) {
    res.status(400).json({ success: false, message: "Can't find the user." });
  }
}
