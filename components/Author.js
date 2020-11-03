import useSWR from "swr";
import Axios from "axios";
import styles from "../styles/author.module.css";

const Author = ({ cid }) => {
  const { data } = useSWR(
    `https://rickandmortyapi.com/api/character/${cid}`,
    (url) => Axios.get(url).then((r) => r.data)
  );

  return (
    <div className={styles.author}>
      <img src={data?.image} alt="" />
      <span>{data?.id} </span>
      <span>{data?.name} </span>
    </div>
  );
};
export default Author;
