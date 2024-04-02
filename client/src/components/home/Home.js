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
  const [data, setData] = useState();
  // const data = useFetch(url, flag);

  useEffect(() => {
    const url = "http://localhost:8080/posts/";
    fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [flag]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file1);
    formData.append("Post", post);
    const url = "http://localhost:8080/posts/";
    await axios.post(url, formData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setFile1("");
    setPost("");
    setFile("");
    setFlag(flag + 1);
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:8080/posts/${id}`;
    const result = await axios.delete(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setFlag(flag + 1);
  };

  const [file1, setFile1] = useState();
  function handleChange(e) {
    // console.log(e.target.files);
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
              <textarea required
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
              <input type="file" onChange={handleChange}></input>
            </p>
            <p>
              <button onClick={handleSubmit}>Post</button>
            </p>
          </div>
       
        {data &&
          data.map((elem) => (
            <div key={elem._id}>
              {elem.users[0].name} - {elem.Post}
              <button onClick={() => handleDelete(elem._id)}>Delete</button>
              <br></br>
              <img style={{ width: "100%" }} src={elem.file} />
              <hr></hr>
            </div>
          ))}
      </div>
    </div>
  );
}
