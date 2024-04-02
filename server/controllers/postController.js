import postModel from "../models/postModel.js";
import fs from "fs";
const createPost = async (req, res) => {
  // console.log(req.role);
  // if (req.role !== "admin") {
  //   return res.status(400).json({ message: "Unauthorized Access" });
  // }
  const { Post } = req.body;

  const newPost = new postModel({
    Post: Post,
    file: req.filePath,
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
    const del_file = await postModel.findOne({ _id: id });
    if (del_file.file) {
      const fname = "images/" + del_file.file.split("/").pop();
      fs.unlink(fname, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
    }
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
    // const Posts = await postModel.find({ userId: req.userId });

    const Posts = await postModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId'",
          foreignField: "id",
          as: "users",
        },
      },
      { $sort: { _id: -1 } },
    ]);
    res.status(200).json(Posts);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { createPost, deletePost, updatePost, getPosts };
