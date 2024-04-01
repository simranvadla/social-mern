import express from 'express'
import userRouter from "./routes/userRoutes.js"
import todoRouter from "./routes/todoRoutes.js"
import postRouter from "./routes/postRoutes.js"
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/todos", todoRouter);
app.use("/posts", postRouter);
mongoose
  .connect("mongodb://127.0.0.1:27017/socialdb1")
  .then(() => {
    app.listen(8080, () => {
      console.log("Server Started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });
