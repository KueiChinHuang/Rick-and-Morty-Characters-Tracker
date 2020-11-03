const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    cid: {
      type: Number,
      required: [true, "Please add a character ID"],
    },
    content: {
      type: String,
      required: true,
      maxlength: [
        200,
        "Content of a comment cannot be more than 200 characters",
      ],
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
