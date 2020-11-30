import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        if (await bcrypt.compare(req.body.password, user.password)) {
          const accessToken = jwt.sign(
            { uid: user._id },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ accessToken: accessToken });
          // res.status(200).json({ success: true, data: user });
        } else {
          res.status(200).json({ success: false, message: "Invalid user." });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Found the user but there is an error.",
          error,
        });
      }
      break;

    // Method doesn't exist
    default:
      res.status(400).json({ success: false, error: "Method is wrong." });
  }
};
