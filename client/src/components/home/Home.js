import React, { useContext, useState, useEffect } from "react";
import { useFetch } from "../../useFetch";
import Homeitems from "./Homeitems";
import axios from "axios";
import "./Home.css";
import { AppContext } from "../../context/appContext";
export default function Home() {
  const { user } = useContext(AppContext);
  const [post, setPost] = useState();
  const [file, setFile] = useState();
  const [filePath, setFilePath] = useState();
  const [fileName, setFileName] = useState();
  const [flag,setFlag] = useState(0)
  // const url = `https://jsonplaceholder.typicode.com/posts/`;
  const url = "http://localhost:8080/";
  const data = useFetch(url,flag);
// console.log(data)
  const handleClick = async (e) => {
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", file);
    const url = "http://localhost:8080/";
    const result = await axios.post(url, formData);

  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const url = "http://localhost:8080/upload/";
    const result = await axios.post(url, formData);
    setFilePath(result.data.filePath);
    setFileName(result.data.fileName)
    // console.log(result.data.filePath);
  };

  useEffect(() => {
    if (file) uploadFile();
  }, [file]);

  const handleSubmit = async () => {
    const url = "http://localhost:8080/post";
    await axios.post(
      url,
      { item: post, file: filePath },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setFlag(flag+1)
    setFilePath(null)
  };
  return (
    <div>
      <h1>News Feeds</h1>
      <div className="Home-container">
        <div className="Home-upload">
          <p>
            <textarea
              className="Home-textarea"
              onChange={(e) => setPost(e.target.value)}
              rows="4"
              cols="50"
              placeholder="What's in your mind?"
            ></textarea>
          </p>
          <p>
            <img src={filePath} />
          </p>
          <p>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              // onChange={(e) => handleClick(e)}
            ></input>
          </p>
          <p>
            <button onClick={handleSubmit}>Post</button>
          </p>
        </div>
        {data &&
          data.map((elem) => (
            <div key={elem._id}>
              <Homeitems elem={elem} />
              <hr></hr>
            </div>
          ))}
      </div>
    </div>
  );
}
