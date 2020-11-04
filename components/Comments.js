import styles from "../styles/comments.module.css";
import useSWR, { trigger } from "swr";
import Axios from "axios";
import Author from "./Author";
import Select from "react-select";
import Link from "next/link";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useState } from "react";

const formatOptionLabel = ({ value }) => <Author cid={value} />;

const Comments = ({ cid, options }) => {
  const { data: commentData } = useSWR(`/api/comment/${cid}`, (url) =>
    Axios.get(url).then((r) => r.data.data)
  );

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postResp = await Axios.post("/api/comment", {
        cid: cid,
        author: author,
        content: content,
      });
      trigger(`/api/comment/${cid}`);
      setContent("");
      console.log("submit succeed.", postResp);
    } catch (error) {
      console.log("faile to submit.", error);
    }
  };

  return (
    <div className={styles.comments}>
      {console.log("author and content:", author, content)}
      <div className={styles.histories}>
        <h2>History</h2>
        {commentData?.map((data, i) => (
          <div className={styles.history} key={i}>
            <span>{data.created_at}</span>
            <Link href="/characters/[id]" as={`/characters/${data.author}`}>
              <a>
                <Author cid={data.author} />
              </a>
            </Link>
            <ArrowForwardIcon />
            <span>{data.content}</span>
          </div>
        ))}
      </div>

      <h2>Your Comment</h2>
      <form onSubmit={handleSubmit}>
        <Select
          options={options}
          formatOptionLabel={formatOptionLabel}
          defaultOptions
          onChange={(e) => setAuthor(e.value)}
          loadingMessage={() => "Loading..."}
        />
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
