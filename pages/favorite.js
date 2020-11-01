import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Cards from "../components/Cards";
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
  const { data: user } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data)
  );

  const [favorites, setFavorites] = useState(user ? user.favorite : []);
  const [allFavData, setAllFavData] = useState([]);

  useEffect(() => {
    const aFunc = async () => {
      setAllFavData([]);
      for (let i in favorites) {
        const oneChar = await getOneData(favorites[i]);
        setAllFavData((prev) => [...prev, oneChar]);
      }
    };
    aFunc();
  }, []);

  return (
    <Layout>
      <title>My Favorite | Rick and Morty Character Tracker</title>
      <article>
        {console.log("this user's favorite items:", favorites)}
        {console.log("this user's allFavData:", allFavData)}
        <h1>Favorite Page</h1>
        {allFavData.length < favorites.length ? (
          <div>No Favorite yet.</div>
        ) : (
          <Cards allCharData={allFavData} />
        )}
      </article>
    </Layout>
  );
}

export default MyFavorite;
