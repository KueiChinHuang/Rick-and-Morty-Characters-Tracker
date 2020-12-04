import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const {
    user: { uid },
    method,
  } = req;

  switch (method) {
    // Get one user with uid
    case "GET":
      try {
        const user = await User.findById(uid);

        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "Can't find the user." });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        const errRes = error.response;
        res.status(400).json({ success: false, errRes });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
