import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import multer from "multer";
const app = express();
app.use(cors());
app.use(express.json());
const SECRET_KEY = "APIKEY";

mongoose.connect("mongodb://127.0.0.1:27017/socialdb");

app.use(express.static("public"));
app.use("/images", express.static("images"));

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

const postSchema = mongoose.Schema(
  {
    item: { type: String, required: true },
    file: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);

app.listen(8080, () => {
  console.log("Server Started on port 8080");
});

app.post("/signup", async (req, res) => {
  const { email, name, pass, role } = req.body;
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exist" });
  } else {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const result = await userModel.create({
      name: name,
      pass: hashedPassword,
      email: email,
      role: role,
    });

    const token = jwt.sign(
      { email: result.email, role: result.role, id: result._id },
      SECRET_KEY
    );
    res.status(201).json({ user: result, token: token });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, pass } = req.body;
    console.log(email, pass);
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(pass, existingUser.pass);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        role: existingUser.role,
        id: existingUser._id,
      },
      SECRET_KEY
    );

    res.status(201).json({ user: existingUser, token: token });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

const auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    try {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
      req.role = user.role;
      next();
    } catch (err) {
      res.status(400).json({ message: "Something Went Wrong" });
    }
  } else {
    res.status(400).json({ message: "Invalid User" });
  }
};

// app.get("/", auth, async (req, res) => {
//   if (req.role !== "user") {
//     res.status(400).json({ message: "Unauthorized Access" });
//   } else {
//     // const item = await postModel.find({ userId: req.userId });
//     const item = await postModel.find();
//     res.status(200).json(item);
//   }
// });

app.get("/", auth, async (req, res) => {
  if (req.role !== "user") {
    res.status(400).json({ message: "Unauthorized Access" });
  } else {
    // const item = await db.collection("posts").find().toArray()
    const item = await postModel.aggregate([
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

    res.status(200).json(item);
  }
});

app.get("/post", auth, async (req, res) => {
  if (req.role !== "user") {
    res.status(400).json({ message: "Unauthorized Access" });
  } else {
    const item = await postModel.find({ userId: req.userId });
    console.log(item);
    res.status(200).json(item);
  }
});

app.delete("/delete/:id", auth, async (req, res) => {
  if (req.role !== "admin") {
    res.status(400).json({ message: "Unauthorized Access" });
  } else {
    const item = await postModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(item);
  }
});

app.post("/post", auth, async (req, res) => {
  const { item, file } = req.body;
  const newPost = new postModel({
    item: item,
    file: file,
    userId: req.userId,
  });
  await newPost.save();
  res.status(201).json(newPost);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now().toString());
    const fileName = Date.now() + "-" + file.originalname;
    req.fileName = fileName;
    req.filePath = "http://localhost:8080/images/" + fileName;
    cb(null, fileName);
    // cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  // Access the uploaded file using req.file
  // Process the file and send a response
  res.status(200).json({ filePath: req.filePath, fileName: req.fileName });
});
