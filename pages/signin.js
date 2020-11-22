import Axios from "axios";
import { useState } from "react";
import { useStateValue } from "../context/StateProvider.jsx";
import styles from "../styles/signin.module.css";

import { useRouter } from "next/router";
const getUsers = async () => {
  const res = await Axios.get("/api/user");
  return res.data.data;
};

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [{}, dispatch] = useStateValue();

  const signIn = async (e) => {
    e.preventDefault();

    if (username == "" || password == "") {
      setMessage("Please enter your username and password");
    } else {
      try {
        let isValid = false;
        const res = await Axios.get("/api/user");
        const users = res.data.data;

        users.forEach((user) => {
          if (user.username == username && user.password == password) {
            dispatch({
              type: "SET_USER",
              payload: {
                user: {
                  uid: user._id,
                  username,
                  password,
                },
              },
            });
            isValid = true;
            router.push("/");
          }
        });

        !isValid
          ? setMessage("Wrong username or password. Please try again.")
          : setMessage(`Welcome, ${username}! We're logging you in ...`);
      } catch (error) {
        console.log("Can't get users.", error);
      }
    }
  };

  const register = async (e) => {
    e.preventDefault();

    if (username == "" || password == "") {
      setMessage("Please enter your username and password");
    } else {
      try {
        const res = await Axios.post("/api/user", { username, password });

        dispatch({
          type: "SET_USER",
          payload: {
            user: {
              uid: res.data.data._id,
              username,
              password,
            },
          },
        });
        setMessage("Registered successfully. We're logging you in ...");
        router.push("/");
      } catch (error) {
        setMessage("This username is existed. Please log in.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form className={styles.signin}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {message != "" && <div className={styles.message}>{message}</div>}
        <button className={styles.btn} onClick={(e) => register(e)}>
          Register
        </button>
        <button className={styles.btn} onClick={(e) => signIn(e)}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
