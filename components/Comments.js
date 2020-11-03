import styles from "../styles/comments.module.css";
import useSWR from "swr";
import Axios from "axios";
import Author from "./Author";
import Select from "react-select";
import Link from "next/link";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const formatOptionLabel = ({ value }) => <Author cid={value} />;

const fetcher = async (nextUrl) => {
  let characters = [];
  while (nextUrl !== null) {
    const charsResp = await Axios(nextUrl).then((r) => r.data);
    nextUrl = charsResp.info?.next || null;
    characters = [...characters, ...charsResp.results];
  }
  return characters;
};

const Comments = ({ cid }) => {
  const { data: allOptions } = useSWR("/api/character/options", (url) =>
    Axios.get(url).then((r) => r.data.data)
  );

  const { data: commentData } = useSWR(`/api/comment/${cid}`, (url) =>
    Axios.get(url).then((r) => r.data.data)
  );

  return (
    <div className={styles.comments}>
      <div className={styles.histories}>
        <h2>History</h2>
        {commentData?.map((data) => (
          <div className={styles.history}>
            <span>{data.created_at}</span>
            <Link href="/characters/[id]" as={`/characters/${cid}`}>
              <a>
                <Author cid={data.author} />
              </a>
            </Link>
            <ArrowForwardIcon/>
            <span>{data.content}</span>
          </div>
        ))}
      </div>
      
      <h2>Your Comment</h2>
      <form>
        <Select
          options={allOptions}
          formatOptionLabel={formatOptionLabel}
          defaultOptions
        />
        <textarea>Hello there, this is some text in a text area</textarea>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Comments;
