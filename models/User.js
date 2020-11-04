const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
      trim: true,
      maxlength: [40, "Title cannot be more than 40 characters"],
    },
    password: {
      type: String,
      required: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    favorite: {
      type: Array,
      required: false,
      maxlength: [1000, "Favorite cannot be more than 1000 characters"],
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
