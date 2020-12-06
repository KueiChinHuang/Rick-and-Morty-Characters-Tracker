import Axios from "axios";
import React from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import ReactLoading from "react-loading";
import Cards from "../components/Cards";
import styles from "../styles/favorite.module.css";
import { useStateValue } from "../context/StateProvider";

function MyFavorite() {
  const [{ token, characters }, dispatch] = useStateValue();
  const requestHeader = { headers: { Authorization: token } };

  // Set up swr to fetch data dynamically
  const fetcherFid = (url) =>
    Axios(url, requestHeader).then((r) => r.data.favIDs);

  const { data: favIDs } = useSWR(token ? "/api/favorite" : null, fetcherFid);

  const favData =
    characters && favIDs
      ? characters.filter((e) => favIDs.includes(e.id))
      : null;

  return (
    <Layout>
      <title>My Favorite | Rick and Morty Character Tracker</title>
      <article>
        <h1>My Favorite</h1>
        {console.log(favData)}
        {typeof favData === "undefined" || !favData ? (
          <div className={styles.loadingContainer}>
            <ReactLoading
              type={"bubbles"}
              color={"lightblue"}
              width={"20%"}
              className={styles.loading}
            />
          </div>
        ) : (
          <section>
            <Cards characterData={favData} />
          </section>
        )}
      </article>
    </Layout>
  );
}

export default MyFavorite;
