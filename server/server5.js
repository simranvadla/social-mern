//app.use - logger
import express from "express";
const app = express();
app.listen(8080);
const logger = (req, res, next) => {
  req.msg = "Hello World";
  next();  //comment and the request will be hung
};

app.use(logger);

app.get("/", (req, res) => {
  res.send(req.msg);
});

app.get("/users", (req, res) => {
  res.send(req.msg);
});

app.get("/posts", (req, res) => {
  res.send(req.msg);
});


// app.get("/users", (req, res) => {
//   res.send(req.msg);
// });

// app.get("/posts", (req, res) => {
//   res.send(req.msg);
// });
