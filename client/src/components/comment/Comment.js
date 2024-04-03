import React, { useContext,useState } from "react";
import { useFetch } from "../../useFetch";
import { AppContext } from "../../context/appContext";
import axios from "axios";
export default function Comment(props) {
  const [comment, setComment] = useState();
  const { user } = useContext(AppContext);
  // const url = `https://jsonplaceholder.typicode.com/comments/?postId=${props.id}`;
  const url = `http://localhost:8080/comments/${props.id}`;
  const data = useFetch(url);

  const handleSubmit = async () => {
    const url = `http://localhost:8080/comments/${props.id}`;
    console.log(user.name)
    await axios.post(url, { comment: comment, username: user.name });
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:8080/comments/${id}`;
    await axios.delete(url);
  };
  return (
    <div>
      <details>
        <summary>Comments({data.length})</summary>
        <div>
          {data &&
            data.map((elem) => (
              <div key={elem._id}>
                <b>{elem.username}:</b>{elem.comment}-
                <button onClick={()=>handleDelete(elem._id)}>Delete</button>
              </div>
            ))}
          <input
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleSubmit}>Post</button>
        </div>
      </details>
    </div>
  );
}
