import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Filter from "../components/filter";
import { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import Axios from "axios";
import useSWR from "swr";

export default function Home({ allCharData }) {
  const { uid } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  const { data } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data)
  );

  useEffect(() => {
    if (data) {
      setFavorites(data.favorite);
      console.log("favorites in use effect:", favorites);
    }
    return () => {
      // cleanup;
    };
  }, [favorites, data]);

  const handleFavorite = async (charId, isFavorite) => {
    if (isFavorite) {
      for (let i = favorites.length - 1; i >= 0; i--) {
        if (favorites[i] == charId) {
          setFavorites((prev) => prev.splice(i, 1));
        }
      }
      await Axios.put(`/api/user/${uid}`, { favorite: favorites })
        .then((res) => console.log("res from PUT : ", res))
        .catch((error) => console.log("error for using axios put:", error));
    } else {
      setFavorites((prev) => prev.push(charId));
      await Axios.put(`/api/user/${uid}`, { favorite: favorites })
        .then((res) => console.log("res from PUT : ", res))
        .catch((error) => console.log("error for using axios put:", error));
    }
  };

  var items = [];
  allCharData.map((char, i) => {
    let isFavorite = favorites.includes(char.id) ? true : false;
    items.push(
      <div className={styles.card}>
        <button onClick={() => handleFavorite(char.id, isFavorite)}>
          {isFavorite ? "FAVORITE!" : "Add?"}
        </button>

        <Link href="/chars/[id]" as={`/chars/${char.id}`} key={i}>
          <a>
            <img src={char.image} width="150" height="150" />
            <p className="title">{char.name}</p>
          </a>
        </Link>
        <p className={utilStyles.listItem}>{char.location?.name}</p>
        <p>{char?.status}</p>
        <p>{char.species}</p>
        <p>{char?.type}</p>
        <p>{char?.gender}</p>
      </div>
    );
  });

  return (
    <>
      <Layout home>
        <Head>Character Tracker</Head>

        <section>
          {console.log("favorites in render:", favorites)}
          <Filter />
          <div className={styles.grid}>{items}</div>
        </section>
      </Layout>
    </>
  );
}
