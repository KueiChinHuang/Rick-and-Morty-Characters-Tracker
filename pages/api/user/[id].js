import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    // Get one user with uid
    case "GET":
      try {
        const user = await User.findById(id);

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
    // Update one user with uid
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

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
    // Detele one user with uid
    case "DELETE":
      try {
        const deletedUser = await User.deleteOne({ _id: id });

        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
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
