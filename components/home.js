import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Filter from "../components/filter";
import { useContext } from "react";
import UserContext from "./userContext";
import Axios from "axios";

const getFavorite = async (uid) => {
  const res = await Axios.get("/api/user", { uid });
  const favorite = res.data.favorite;
  return favorite;
};

export default function Home({ allCharData }) {
  const { uid } = useContext(UserContext);
  let favorites = null;
  if (uid) {
    favorites = getFavorite(uid);
    console.log("favorite:", favorites);
  }

  var items = [];
  allCharData.map((char, i) => {
    items.push(
      <div className={styles.card}>
        <div>Is favorite: {}</div>

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
