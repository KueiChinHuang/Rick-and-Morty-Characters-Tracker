import styles from "../styles/author.module.css";
import { useStateValue } from "../context/StateProvider";

const Author = ({ cid }) => {
  const [{ user, characters, options }, dispatch] = useStateValue();
  const data = characters?.find((character) => character.id === cid);

  return (
    <div className={styles.author}>
      <img src={data?.image} alt="" />
      <span>{data?.id} </span>
      <span>{data?.name} </span>
    </div>
  );
};
export default Author;
