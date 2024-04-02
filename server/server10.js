//Understanding res
import express from "express";
const app = express();
// app.use(express.static("public"));

app.get("/", (req, res) => {
  //empty block will get into infinite loop
  // res.end() //end the request
  // res.send("Hello"); //status is 200 by default
    // res.status(201).json({"name":"John"})
  res.sendFile(
    "c:\\users\\nairx\\myprojects\\social-mern\\server\\images\\1712034432240-2.png"
  );
  // res.sendFile(
  //   "c:\\users\\nairx\\myprojects\\social-mern\\server\\public\\home.html"
  // );
});
app.listen(8080, () => {
  console.log("Server started on port 8080");
});

