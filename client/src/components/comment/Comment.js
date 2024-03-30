import React, { useContext } from "react";
import { useFetch } from "../../useFetch";
import { AppContext } from "../../context/appContext";
export default function Comment(props) {
  const { user } = useContext(AppContext);
  const url = `https://jsonplaceholder.typicode.com/comments/?postId=${props.id}`;
  const data = useFetch(url);
  return (
    <div>
      <details>
        <summary>
          View Comments
        </summary>
        <div>
          {data &&
            data.map((elem) => (
              <li key={elem.id}>
                {elem.email}- {elem.body}
               </li>
            ))}
        </div>
      </details>
    </div>
  );
}
