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
    mutate(`/api/user/${uid}`);
    if (favIDs.includes(cid)) {
      await Axios.put(`/api/user/${uid}`, {
        favorite: favIDs.filter((p) => p !== cid),
      })
        .then((res) => console.log("res from PUT : ", res.data.data.favorite))
        .catch((error) =>
          console.log("error for using axios put:", error.response)
        );
    } else {
      await Axios.put(`/api/user/${uid}`, {
        favorite: favIDs.concat(cid),
      })
        .then((res) => console.log("res from PUT : ", res.data.data.favorite))
        .catch((error) =>
          console.log("error for using axios put:", error.response)
        );
    }
    trigger(`/api/user/${uid}`);
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
