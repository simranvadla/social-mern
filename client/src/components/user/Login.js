import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import Register from "./Register";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
export default function Login() {
  const { user, setUser, users, setUsers, flag, setFlag } =
    useContext(AppContext);
  const [visible, setvisible] = useState(false);
  const [msg, setMsg] = useState();
  // (elem) => elem.email === user.email && elem.pass === user.pass
  const validateUser = async () => {
    // const found = users.find((elem) => elem.id === parseInt(user.email));
    try {
      const found = await axios.post("http://localhost:8080/signin/", user);
      setUser((prev) => ({
        ...prev,
        name: found.data.user.name,
        email: found.data.user.email,
        role:found.data.user.role,
        token: found.data.token,
      }));
      setFlag(() => 2);
    } catch (err) {
      setMsg(() => "Invalid email or password");
    }
    // console.log(found.status);
    // if (found) {
    //   setUser((prev) => ({ ...prev, name: found.name }));
    //   setFlag(() => 2);
    // } else setMsg(() => "Invalid email or password");
  };
  return (
    <>
      {flag === 1 && <Register />}
      <div className="container">
        <div className="leftBox">
          <div className="title">Social React</div>
          <br></br>{" "}
          <div className="tagLine">Represent your self everywhere.</div>
        </div>
        <div className="rightBox">
          <div className="Login-msg">{msg}</div>
          <div>
            <input
              className="Login-txt"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Enter Email"
              autoFocus
            ></input>
          </div>
          <div className="pwdEye">
            <input
              className="Login-txt"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, pass: e.target.value }))
              }
              type={visible ? "text" : "password"}
              placeholder="Enter Passcode"
            ></input>
            <span onClick={() => setvisible(() => !visible)}>
              {visible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </span>
          </div>
          <br></br>
          <br></br>
          <div>
            <button className="Login-btn" onClick={validateUser}>
              Log in
            </button>
          </div>
          <br></br>
          <div>Forgot Password?</div>
          <br></br>
          <div style={{textAlign:'center'}}>
            <button
              className="Login-register-btn"
              onClick={() => setFlag(() => 1)}
            >
              Join now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
