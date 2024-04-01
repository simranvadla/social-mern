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
  const [flag, setFlag] = useState(0);
  const url = "http://localhost:8080/";
  const data = useFetch(url, flag);
  const handleClick = async (e) => {
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", file);
    const url = "http://localhost:8080/";
    const result = await axios.post(url, formData);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file1);
    const url = "http://localhost:8080/upload/";
    const result = await axios.post(url, formData);
    return result;
    // setFilePath(result.data.filePath);
    // setFileName(result.data.fileName)
  };

  // useEffect(() => {
  //   if (file) uploadFile();
  // }, [file]);

  const handleSubmit = async () => {
    // const result = await uploadFile()
    // setFilePath(result.data.filePath);
    // console.log("FilePath",filePath)
    const formData = new FormData();
    formData.append("file", file1);
    formData.append("item", post);
    const url = "http://localhost:8080/post";
    await axios.post(url, formData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setFlag(flag + 1);
    setFile(null);
  };

  const [file1, setFile1] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setFile1(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
  }

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
            <img src={file} />
            {/* <img src={filePath} /> */}
          </p>
          <p>
            <input
              type="file"
              // onChange={(e) => setFile(e.target.files[0])}
              onChange={handleChange}
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
