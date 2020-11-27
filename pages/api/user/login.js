import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    // Login a user
    case "POST":
      const user = await User.findOne({ username: req.body.username });
      if (user == null) return res.status(400).send("Cannot find user");

      try {
        // if user enter correct password
        (await bcrypt.compare(req.body.password, user.password))
          ? res.status(200).json({ success: true, data: user })
          : res.status(200).json({ success: false, message: "Invalid user." });
      } catch (error) {
        res.status(500).json({ success: false, message: "bcrypt error" });
      }
      break;

    // Method doesn't exist
    default:
      res.status(400).json({ success: false, error: "Method is wrong." });
  }
};
