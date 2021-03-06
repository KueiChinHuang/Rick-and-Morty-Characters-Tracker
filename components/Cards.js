import styles from "../styles/card.module.css";
import Link from "next/link";
import FavStar from "./FavStar";
import { useStateValue } from "../context/StateProvider";

const Cards = ({ characterData }) => {
  const [{ username }, dispatch] = useStateValue();

  return (
    // A container for all the cards
    <div className={styles.cardContainer}>
      {/* Create each card */}
      {characterData.map((character, i) => (
        <div className={styles.card} key={i}>
          <div className={styles.starContainer}>
            {/* User can manage favorite only when they login */}
            {!username ? null : <FavStar character={character} />}
          </div>
          <img
            className={styles.img}
            src={character.image}
            width="150"
            height="150"
          />
          <div className={styles.content}>
            <div className={styles.title}>
              <Link href="/characters/[id]" as={`/characters/${character.id}`}>
                <a title={character.name}>
                  <h3>{character.name}</h3>
                </a>
              </Link>
              <small>{character.location?.name}</small>
            </div>

            <div className={styles.description}>
              <p>
                <span>Status:</span> {character?.status}
              </p>
              <p>
                <span>Species:</span> {character.species}
              </p>
              <p>
                <span>Type:</span> {character?.type}
              </p>
              <p>
                <span>Gender:</span> {character?.gender}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
