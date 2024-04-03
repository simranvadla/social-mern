import commentModel from "../models/commentModel.js";

const createComment = async (req, res) => {
  const { comment, username } = req.body;
  const id = req.params.id;
  const newComment = new commentModel({
    comment: comment,
    postId: id,
    username: username,
  });
  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await commentModel.findByIdAndDelete(id);
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somethong went Wrong" });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await commentModel.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { createComment, deleteComment, getComments };
