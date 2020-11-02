import Axios from "axios";
import React, { useContext } from "react";
import useSWR from "swr";
import Card from "../components/Card";
import styles from "../styles/cards.module.css";
import Layout from "../components/Layout";
import UserContext from "../components/UserContext";

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
          <div>Loding...</div>
        ) : (
          <section>
            <div className={styles.grid}>
              {favData.map((data) => (
                <Card character={data} />
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}

export default MyFavorite;
