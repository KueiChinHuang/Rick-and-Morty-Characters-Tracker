import styles from "../styles/cards.module.css";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "./UserContext";
import Axios from "axios";
import useSWR, { mutate, trigger } from "swr";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

export default function Card({ character }) {
  const { uid } = useContext(UserContext);
  const { data: favIDs } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data.favorite)
  );

  const handleFavorite = async (cid) => {
    // If this character is already one of user's favorites, REMOVE it
    if (favIDs.includes(cid)) {
      await Axios.put(`/api/user/${uid}`, {
        favorite: favIDs.filter((p) => p !== cid),
      })
        .then((res) => console.log("DB updated:", res.data.data.favorite))
        .catch((error) => console.log("Failed to update DB:", error));
    }

    // If this character is NOT yet a user's favorite, ADD it
    else {
      await Axios.put(`/api/user/${uid}`, {
        favorite: favIDs.concat(cid),
      })
        .then((res) => console.log("DB updated:", res.data.data.favorite))
        .catch((error) => console.log("Failed to update DB:", error));
    }

    trigger(`/api/user/${uid}`);
    trigger(`/api/user/${uid}/favorite`);
  };

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
        {!uid ? (
          <></>
        ) : (
          <div
            className={styles.favorite}
            onClick={() => handleFavorite(character.id)}
          >
            {favIDs && favIDs.includes(character.id) ? (
              <div title="Remove from favorite">
                <StarIcon color="primary" fontSize="large" />
              </div>
            ) : (
              <div title="Add to favorite">
                <StarBorderIcon color="disabled" fontSize="large" />
              </div>
            )}
          </div>
        )}
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
