import dbConnect from "../../../util/dbConnect";
import Comment from "../../../models/Comment";

dbConnect();

export default async (req, res) => {
    const {
      query: { cid },
      method,
    } = req;

  switch (method) {
    case "GET":
      try {
        const comments = await Comment.find({cid: cid});
        res.status(200).json({ success: true, data: comments });
      } catch (error) {
        const errRes = error.response;
        res.status(400).json({ success: false, errRes });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Method is wrong." });
  }
};
