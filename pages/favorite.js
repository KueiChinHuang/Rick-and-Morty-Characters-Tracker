import Axios from "axios";
import React, { useContext } from "react";
import useSWR from "swr";
import Card from "../components/Card";
import styles from "../styles/cards.module.css";
import Layout from "../components/Layout";
import UserContext from "../components/UserContext";

const getOneData = async (cid) => {
  const charResp = await Axios(
    `https://rickandmortyapi.com/api/character/${cid}`
  );
  const charData = await charResp.data;
  return charData;
};

function MyFavorite() {
  const { uid } = useContext(UserContext);
  const { data: favData } = useSWR(`/api/user/${uid}/favorite`, (url) =>
    Axios(url).then((r) => r.data.favData)
  );

  return (
    <Layout>
      <title>My Favorite | Rick and Morty Character Tracker</title>
      <article>
        {console.log("uid:", uid)}
        {console.log("favData:", favData)}
        <h1>My Favorite</h1>
        {typeof favData == "undefined" || !favData ? (
          <div>No Favorite yet.</div>
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
