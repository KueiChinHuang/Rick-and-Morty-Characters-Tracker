import dbConnect from "../../util/dbConnect";
import User from "../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        const errRes = error.response;
        res.status(400).json({ success: false, errRes });
      }
      break;
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        const errRes = error.response;
        res.status(400).json({ success: false, errRes });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Method is wrong." });
  }
};
