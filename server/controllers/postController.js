import postModel from "../models/postModel.js"

const createPost = async (req, res) => {
  // console.log(req.role);
  // if (req.role !== "admin") {
  //   return res.status(400).json({ message: "Unauthorized Access" });
  // }
  const { Post } = req.body;

  const newPost = new postModel({
    Post: Post,
    userId: req.userId,
  });
  try {
    // if (req.role !== "admin") {
    //   return res.status(200).json({ message: "Unauthorized Access" });
    // }
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const Post = await postModel.findByIdAndDelete(id);
    res.status(200).json(Post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somethong went Wrong" });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { Post } = req.body;
  const newPost = {
    Post: Post,
    userId: req.userId,
  };
  try {
    await postModel.findByIdAndUpdate(id, newPost, { new: true });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPosts = async (req, res) => {
  try {
    const Posts = await postModel.find({ userId: req.userId });
    res.status(200).json(Posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { createPost, deletePost, updatePost, getPosts };
