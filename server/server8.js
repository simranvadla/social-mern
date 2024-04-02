//req params
import express from "express";
const app = express();

app.use(express.json())

//localhost:8080/20
// app.post("/:id", (req, res) => {
//   res.send(req.params.id);
// });

// //localhost:8080/20/john
// app.post("/:id/:name", (req, res) => {
//   res.send(req.params.id+req.params.name);
// });

// //localhost:8080/name/:john/age/:20
app.post("/name/:name/age/:age", (req, res) => {
    res.send(req.params.name+req.params.age);
  });

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
