import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    username:{ type: String },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("comments", commentSchema);
