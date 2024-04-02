//req headers
import express from "express";
const app = express();
app.get("/", (req, res) => {
  // res.send(req.headers);
  res.send(req.headers.authorization);
});
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
