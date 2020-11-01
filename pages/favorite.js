import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
  const { data: favIDs } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data.favorite)
  );

  const [favData, setFavData] = useState([]);

  useEffect(() => {
    const aFunc = async () => {
      setFavData([]);
      for (let i in favIDs) {
        const oneChar = await getOneData(favIDs[i]);
        setFavData((prev) => [...prev, oneChar]);
      }
    };
    aFunc();
  }, []);

  return (
    <Layout>
      <title>My Favorite | Rick and Morty Character Tracker</title>
      <article>
        {console.log("favIDs:", favIDs)}
        {console.log("favData:", favData)}
        <h1>My Favorite</h1>
        {favData && favIDs && favData.length !== favIDs.length ? (
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
