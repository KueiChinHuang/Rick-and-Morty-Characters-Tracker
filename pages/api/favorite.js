import dbConnect from "../../util/dbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";

dbConnect();

const authenticated = (fn) => async (req, res) => {
  const token = req.headers.authorization;

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async function (err, user) {
      if (!err && user) {
        req.user = user;
        return await fn(req, res);
      }
      return res.status(403).send({ message: "Invalid token" });
    }
  );
};

export default authenticated(async (req, res) => {
  const {
    user: { uid },
    method,
  } = req;

  switch (method) {
    // Get all users
    case "GET":
      try {
        const user = await User.findById(uid);
        const favorite = user.favorite;
        res.status(200).json({ success: true, data: favorite });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    // Method doesn't exist
    default:
      res.status(400).json({ success: false, error: "Method is wrong." });
  }
});
