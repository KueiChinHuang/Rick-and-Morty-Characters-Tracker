import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Filter from "../components/filter";
import { useContext, useState } from "react";
import UserContext from "./userContext";
import Axios from "axios";
import useSWR from "swr";

export default function Home({ allCharData }) {
  const { uid } = useContext(UserContext);
  const [favorites, setFavorites] = useState();

  const { data } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data)
  );

  const handleFavorite = async (charId, isFavorite) => {
    if (isFavorite) {
      for (let i = favorites.length - 1; i >= 0; i--) {
        if (favorites[i] == charId) {
          favorites.splice(i, 1);
        }
      }
      const res = await Axios.put("/api/user", {
        favorite: favorites,
      });
      console.log("res from PUT: ", res);
    }
  };

  var items = [];
  allCharData.map((char, i) => {
    let isFavorite = false;
    if (data && data.favorite.includes(char.id.toString())) isFavorite = true;
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
          <Filter />
          <div className={styles.grid}>{items}</div>
        </section>
      </Layout>
    </>
  );
}
