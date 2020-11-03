import styles from "../styles/comments.module.css";
import useSWR from "swr";
import Axios from "axios";
import Author from "./Author";
import Select from "react-select";
import { getAllData } from "../lib/chars";
import AsyncSelect from "react-select/async";
import { useState } from "react";

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
  const { data: allCharData } = useSWR(
    "https://rickandmortyapi.com/api/character/",
    fetcher
  );
  const { data: allOptions } = useSWR("/api/character/options", (url) =>
    Axios.get(url).then((r) => r.data.data)
  );

  const { data: commentData } = useSWR(`/api/comment/${cid}`, (url) =>
    Axios.get(url).then((r) => r.data.data)
  );

  return (
    <div className={styles.comments}>
      {console.log("cid:", cid, "get comment:", commentData)}
      {console.log("allOptions:", allOptions)}
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
        <Select options={allOptions} formatOptionLabel={formatOptionLabel} />
        <textarea>Hello there, this is some text in a text area</textarea>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Comments;
