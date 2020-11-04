import Axios from "axios";
import React, { useContext } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import UserContext from "../components/UserContext";
import ReactLoading from "react-loading";
import Cards from "../components/Cards";
import styles from "../styles/favorite.module.css";

function MyFavorite() {
  const { uid } = useContext(UserContext);
  const { data: favData } = useSWR(`/api/user/${uid}/favorite`, (url) =>
    Axios(url).then((r) => r.data.favData)
  );

  return (
    <Layout>
      <title>My Favorite | Rick and Morty Character Tracker</title>
      <article>
        <h1>My Favorite</h1>
        {typeof favData == "undefined" || !favData ? (
          <div className={styles.loadingContainer}>
            <ReactLoading
              type={"bubbles"}
              color={"lightblue"}
              height={"10%"}
              width={"10%"}
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
