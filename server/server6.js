//Understanding express.json
import express from "express";
const app = express();
app.use(express.json()); //parses req.body to json

app.post("/", (req, res) => {
  let data = req.body;
  console.log(data)
  res.json(data);
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
