import React, { useContext, useState } from "react";
import { useFetch } from "../../useFetch";
import { AppContext } from "../../context/appContext";
import axios from "axios";
export default function Like(props) {
  const [comment, setComment] = useState();
  const { user } = useContext(AppContext);
  const url = `http://localhost:8080/likes/${props.id}`;
  const data = useFetch(url);
  const found = data && data.filter((e) => e.userId === user.id);
  const toggleLike = async () => {
    const url = `http://localhost:8080/likes/${user.id}/${props.id}`;
    console.log(user.name);
    await axios.post(url);
  };
  return (
    <div>
      <button
        className={found.length>0 ? "Home-like-green" : "Home-like-silver"}
        onClick={toggleLike}
      >
        Likes({data.length})
      </button>

      {/* <details>
        <summary>Likes({data.length})</summary>
        <div>
          {data &&
            data.map((elem) => (
              <li key={elem._id}>
                {elem.username}- {elem.comment}-<button onClick={()=>handleDelete(elem._id)}>Delete</button>
              </li>
            ))}
          <input
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleSubmit}>Post</button>
        </div>
      </details> */}
    </div>
  );
}
