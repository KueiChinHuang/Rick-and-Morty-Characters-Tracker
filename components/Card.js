import styles from "../styles/cards.module.css";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "./UserContext";
import Favorite from "./Favorite";

export default function Card({ character }) {
  const { uid } = useContext(UserContext);

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
        {!uid ? null : <Favorite character={character} />}
        <div className={styles.title}>
          {/* User can click on character only when they login */}
          {!uid ? (
            <h3>{character.name}</h3>
          ) : (
            <Link href="/characters/[id]" as={`/characters/${character.id}`}>
              <a title={character.name}>
                <h3>{character.name}</h3>
              </a>
            </Link>
          )}
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
