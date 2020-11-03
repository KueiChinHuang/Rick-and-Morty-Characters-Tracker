import styles from "../styles/comments.module.css";
import useSWR from "swr";
import Axios from "axios";
import Author from "./Author";

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
              <span>
                <Author cid={data.author} />
              </span>
              <span>{data.author}</span>
              <span>{data.content}</span>
            </li>
          ))}
        </ul>
      </div>
      <form>
        <select>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option selected value="coconut">
            Coconut
          </option>
          <option value="mango">Mango</option>
        </select>
        <textarea>Hello there, this is some text in a text area</textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Comments;
