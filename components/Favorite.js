import { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import Axios from "axios";
import useSWR from "swr";

const Favorite = (cid) => {
  const { uid } = useContext(UserContext);
  const { data } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data)
  );
  const [favorites, setFavorites] = useState(data ? data.favorite : []);

  useEffect(() => {
    console.log("------------------IN useEffect--------------------");
    console.log("uid:", uid);
    console.log("data:", data);
    console.log("favorites:", favorites);
    console.log("------------------Finish useEffect--------------------");
  }, [uid, data, favorites]);

  const handleFavorite = async (cid) => {
    if (favorites.includes(cid)) {
      setFavorites((prev) => prev.filter((p) => p !== cid));
      await Axios.put(`/api/user/${uid}`, { favorite: favorites })
        .then((res) => console.log("res from PUT : ", res))
        .catch((error) => console.log("error for using axios put:", error));
    } else {
      setFavorites((prev) => prev.concat(cid));
      await Axios.put(`/api/user/${uid}`, {
        favorite: favorites.concat(cid),
      })
        .then((res) => console.log("res from PUT : ", res))
        .catch((error) => console.log("error for using axios put:", error));
    }
  };

  return (
    <button onClick={() => handleFavorite(cid)}>
      {typeof favorites !== "undefined" && favorites.includes(cid)
        ? "FAVORITE!"
        : "Add?"}
    </button>
  );
};

export default Favorite;
