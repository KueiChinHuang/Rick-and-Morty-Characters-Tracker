import styles from "../styles/comments.module.css";
import useSWR from "swr";
import Axios from "axios";

const Comments = ({ cid }) => {
  const { data: commentData } = useSWR(`/api/comment/${cid}`, (url) =>
    Axios.get(url).then((r) => r.data.data)
  );

  return (
    <div className={styles.comments}>
      {console.log("cid:", cid, "get comment:", commentData)}
      <div className={styles.history}>
        <ul>
          {commentData?.map((data) => (
            <li>
              <span>{data.created_at}</span>
              <span>{data.author}</span>
              <span>{data.content}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.new}>
        <div className={styles.author}>Autohr</div>
        <textarea></textarea>
        <button>Comment</button>
      </div>
    </div>
  );
};

export default Comments;
