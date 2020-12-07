import styles from "../styles/comments.module.css";
import useSWR, { trigger, mutate, cache } from "swr";
import Axios from "axios";
import Author from "./Author";
import Select from "react-select";
import Link from "next/link";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useState } from "react";
import Date from "./Date";
import { useRouter } from "next/router";
import { useStateValue } from "../context/StateProvider";

const Comments = ({ cid }) => {
  const [{ options_character }, dispatch] = useStateValue();

  const router = useRouter();
  const { data: commentData } = useSWR(`/api/comment/?${cid}`, (url) =>
    Axios.get(url, { params: { cid: cid } }).then((r) => r.data.comments)
  );

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const goToAuthor = (author) => {
    cache.clear();
    router.push(`/characters/${author}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cid === author) {
      setMessage("Please try to use another character as the author.");
    } else {
      try {
        const newComment = {
          cid: cid,
          author: author,
          content: content,
        };
        await Axios.post("/api/comment", newComment);
        trigger(`/api/comment/?${cid}`);
        setContent("");
        console.log("Submit succeed.");
        setMessage("");
      } catch (error) {
        setMessage("Please ensure you have set both author and content.");
        console.log("Fail to submit.", error);
      }
    }
  };

  return (
    <div className={styles.comments}>
      <div className={styles.histories}>
        <h2>History Comments</h2>
        {!commentData || commentData.length === 0 ? (
          <div>No history comments.</div>
        ) : (
          commentData.map((data, i) => (
            <div className={styles.history} key={i}>
              <Date dateString={data.created_at} />
              <div
                className={styles.authorBtn}
                onClick={() => goToAuthor(data.author)}
              >
                <Author cid={data.author} />
              </div>
              <ArrowForwardIcon />
              <span>{data.content}</span>
            </div>
          ))
        )}
      </div>

      <h2>Your Comment</h2>
      <div className={styles.message}>{message}</div>
      <form onSubmit={handleSubmit}>
        {!options_character ? null : (
          <Select
            options={options_character}
            formatOptionLabel={({ value }) => <Author cid={value} />}
            defaultInputValue=""
            placeholder="Select or type to search ..."
            onChange={(e) => setAuthor(e.value)}
          />
        )}
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Leave your comment here..."
        ></textarea>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Comments;
