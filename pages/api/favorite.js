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
      if (err) return res.status(403).send({ message: "Invalid token" });
      req.user = user;
      return await fn(req, res);
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
        const favIDs = user.favorite;
        res.status(200).json({ success: true, favIDs });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    // Update one user with uid
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(uid, req.body, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "Can't find the user." });
        }

        res.status(200).json({ success: true, favIDs: user.favorite });
      } catch (error) {
        const errRes = error.response;
        res.status(400).json({ success: false, errRes });
      }
      break;

    // Method doesn't exist
    default:
      res.status(400).json({ success: false, error: "Method is wrong." });
  }
});
