import styles from "../styles/card.module.css";
import Card from "./Card";

const Cards = ({ characterData }) => {
  return (
    <div className={styles.grid}>
      {characterData.map((data, i) => (
        <Card character={data} key={i} />
      ))}
    </div>
  );
};

export default Cards;
