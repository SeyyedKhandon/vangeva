import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    author: {
      type: String,
      required: [true],
    },
    title: {
      type: String,
      required: [true, "Please add a title value"],
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    thumbnailUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
