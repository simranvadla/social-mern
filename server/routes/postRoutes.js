import express from 'express'
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import auth from "../middlewares/auth.js"

import authorize from "../middlewares/authorize.js"

const postRouter = express.Router();

postRouter.get("/", auth, getPosts);

postRouter.post("/", auth, createPost);

postRouter.delete("/:id", auth, deletePost);

postRouter.put("/:id", auth, updatePost);

export default postRouter;
