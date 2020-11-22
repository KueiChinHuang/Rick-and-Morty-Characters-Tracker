import styles from "../styles/card.module.css";
import Link from "next/link";
import FavStar from "./FavStar";
import { useStateValue } from "../context/StateProvider";

export default function Card({ character }) {
  // Get user's id
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className={styles.card}>
      <img
        className={styles.img}
        src={character.image}
        width="150"
        height="150"
      />
      <div className={styles.content}>
        {/* User can manage favorite only when they login */}
        {!user ? null : <FavStar character={character} />}
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
  );
}
