//accessing query string
import express from "express";
var app = express();
app.listen(8080, () => {
  console.log("Server Started on Port 8080");
});
app.get("/", function (req, res) {
  console.log(req.query)
  const response = {
     name:req.query.name,
     age:req.query.age
  };
   res.send(JSON.stringify(response));

});
