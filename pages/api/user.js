import dbConnect from "../../util/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    // Get all users
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    // Create a user
    case "POST":
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
          username: req.body.username,
          password: hashedPassword,
        });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        let message = "";
        if (error.code === 11000) message = "User existed";
        res
          .status(400)
          .json({ success: false, error: error, message: message });
      }
      break;
    // Method doesn't exist
    default:
      res.status(400).json({ success: false, error: "Method is wrong." });
  }
};
