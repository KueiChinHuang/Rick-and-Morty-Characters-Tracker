import styles from "../styles/cards.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import Axios from "axios";
import useSWR, { mutate, trigger } from "swr";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Filter from "./Filter";

export default function Cards({ allCharData }) {
  const { uid } = useContext(UserContext);
  const { data: user } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data)
  );
  const [favIDs, setFavIDs] = useState(user ? user.favorite : []);

  const handleFavorite = async (charId) => {
    mutate(`/api/user/${uid}`);
    if (favIDs.includes(charId)) {
      setFavIDs((prev) => prev.filter((p) => p !== charId));
      await Axios.put(`/api/user/${uid}`, {
        favorite: favIDs.filter((p) => p !== charId),
      })
        .then((res) => console.log("res from PUT : ", res.data.data.favorite))
        .catch((error) =>
          console.log("error for using axios put:", error.response)
        );
    } else {
      setFavIDs((prev) => prev.concat(charId));
      await Axios.put(`/api/user/${uid}`, {
        favorite: favIDs.concat(charId),
      })
        .then((res) => console.log("res from PUT : ", res.data.data.favorite))
        .catch((error) =>
          console.log("error for using axios put:", error.response)
        );
    }
    trigger(`/api/user/${uid}`);
  };

  var items = [];
  allCharData.map((char, i) => {
    items.push(
      <div className={styles.card} key={i}>
        <img className={styles.img} src={char.image} width="150" height="150" />
        <div className={styles.content}>
          {!uid ? (
            <></>
          ) : (
            <div
              className={styles.favorite}
              onClick={() => handleFavorite(char.id)}
            >
              {typeof favIDs !== "undefined" && favIDs.includes(char.id) ? (
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
              <h3>{char.name}</h3>
            ) : (
              <Link href="/chars/[id]" as={`/chars/${char.id}`}>
                <a title={char.name}>
                  <h3>{char.name}</h3>
                </a>
              </Link>
            )}
            <small>{char.location?.name}</small>
          </div>

          <div className={styles.description}>
            <p>
              <span>Status:</span> {char?.status}
            </p>
            <p>
              <span>Species:</span> {char.species}
            </p>
            <p>
              <span>Type:</span> {char?.type}
            </p>
            <p>
              <span>Gender:</span> {char?.gender}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section>
      {uid && <Filter />}
      <div className={styles.grid}>{items}</div>
    </section>
  );
}
