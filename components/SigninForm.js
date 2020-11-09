import Axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import styles from "../styles/signin.module.css";

const getUsers = async () => {
  const res = await Axios.get("/api/user");
  return res.data.data;
};

const createUser = async (username, password) => {
  const res = await Axios.post("/api/user", { username, password });
  return res.data.data._id;
};

const Form = () => {
  const { signIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (uid !== "") signIn(username, uid);
  }, [uid]);

  const handleOnClick = async (e) => {
    e.preventDefault();

    if (username == "" || password == "") {
      setMessage("Please enter your username and password");
    } else {
      let oldUser = false;

      const users = await getUsers();
      users.forEach((user) => {
        if (user.username == username && user.password == password) {
          setUid(user._id);
          oldUser = true;
        }
      });

      if (oldUser === false) {
        const newUid = await createUser(username, password);
        setUid(newUid);
      }
    }
  };

  return (
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
      <button className={styles.btn} onClick={(e) => handleOnClick(e)}>
        Submit
      </button>
    </form>
  );
};

export default Form;
