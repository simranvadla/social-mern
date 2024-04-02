//understanding app get method
import express from "express";
var app = express();
app.listen(8080)
app.get("/", (req, res) => {
  res.send("GET request for /");
});
app.get("/users", (req, res) => {
  res.send("Got a GET request for /users");
});
// // This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get("/ab*cd", (req, res) => {
  res.send("Got a GET request for /ab*cd");
});
