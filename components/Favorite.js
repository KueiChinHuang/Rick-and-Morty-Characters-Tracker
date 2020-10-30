import { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import Axios from "axios";
import useSWR from "swr";

const Favorite = ({ cid }) => {
  const { uid } = useContext(UserContext);
  const { data } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data)
  );
  const [favorites, setFavorites] = useState(() => (data ? data.favorite : []));

  const handleFavorite = async () => {
    if (favorites.includes(cid)) {
      // REMOVE DATA
      setFavorites((prev) => prev.filter((p) => p !== cid));
      console.log("REMOVE DATA, after setFavorites, favorites:", favorites);
      console.log(
        "favorites.filter((p) => p !== cid):",
        favorites.filter((p) => p !== cid)
      );
      await Axios.put(`/api/user/${uid}`, {
        favorite: favorites.filter((p) => p !== cid),
      })
        .then((res) => console.log("res from PUT : ", res.data.data.favorite))
        .catch((error) => console.log("error for using axios put:", error));
    } else {
      // INSERT DATA
      setFavorites((prev) => prev.concat(cid));
      console.log("INSERT DATA, after setFavorites, favorites:", favorites);
      await Axios.put(`/api/user/${uid}`, {
        favorite: favorites.concat(cid),
      })
        .then((res) => console.log("res from PUT : ", res.data.data.favorite))
        .catch((error) => console.log("error for using axios put:", error));
    }
  };

  return (
    <button onClick={handleFavorite}>
      {!data
        ? console.log("No Data")
        : console.log("in render, data.favorite:", data.favorite)}
      {console.log("in render, favorites:", favorites)}
      {typeof favorites !== "undefined" && favorites.includes(cid)
        ? "FAVORITE!"
        : "Add?"}
    </button>
  );
};

export default Favorite;
