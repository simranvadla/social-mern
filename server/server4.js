//crud with mongoclient and mongoose
import express from "express";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
const db = client.db("temp");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const items = await db.collection("products").find().toArray();
  res.status(200).json(items);
});
app.post("/", async (req, res) => {
  const { name, price } = req.body;
  const data = {
    name: name,
    price: price,
  };
  const newProduct = await db.collection("products").insertOne(data);
  res.status(200).json(newProduct);
});
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db
    .collection("products")
    .deleteOne({ _id: new ObjectId(id) });
  res.status(200).json(result);
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const result = await db
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: product });
  res.status(200).json(result);
});

app.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const limit = 1;
  const skip = (pid - 1) * limit;
  const total = await db.collection("products").countDocuments();
  const products = await db
    .collection("products")
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray();
  res.json({ products, total });
});

app.listen(8080, () => {
  console.log("Server Started on port 8080");
});

///////////////////////////////////////////
// import express from "express";
// import mongoose from "mongoose";
// const app = express();
// app.use(express.json());
// mongoose.connect("mongodb://127.0.0.1:27017/temp");
// const productSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//   },
//   { timestamps: true }
// );
// const productModel = mongoose.model("products", productSchema);
// app.listen(8080, () => {
//   console.log("Server Started on port 8080");
// });
// app.get("/", async (req, res) => {
//   const items = await productModel.find();
//   res.status(200).json(items);
// });
// app.post("/", async (req, res) => {
//   const { name, price } = req.body;
//   const newProduct = new productModel({
//     name: name,
//     price: price,
//   });
//   await newProduct.save();
//   res.status(200).json(newProduct);
// });
// app.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   const result = await productModel.findByIdAndDelete(id);
//   res.status(200).json(result);
// });

// app.patch("/:id", async (req, res) => {
//   const id = req.params.id;
//   const product = req.body
//   const result = await productModel.findByIdAndUpdate(id,product);
//   res.status(200).json(product)
// });

// app.get("/:pid", async (req,res) => {
//     const pid = req.params.pid
//     const limit = 1;
//     const skip = (pid - 1) * limit;
//     const total = await productModel.countDocuments({});
//     const products = await productModel.find({}).skip(skip).limit(limit);
//     res.json({products,total})
// })
