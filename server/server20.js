import express from "express";
import multer from "multer";
import cors from "cors";
const app = express();
app.use(cors());
// app.use(express.static("public"));

app.use("/images", express.static("images"));

app.listen(8080, () => {
  console.log("Server Started on port 8080");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    req.filename = "http://localhost:8080/images/" + filename;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

app.post("/", upload.single("file"), (req, res) => {
  res.status(200).json({ msg: "completed" });
  // res.status(200).json({ filePath: req.filename });
});
