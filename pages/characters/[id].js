import { useContext } from "react";
import useSWR, { trigger } from "swr";
import Layout from "../../components/Layout";
import UserContext from "../../components/UserContext";
import { getAllData } from "../../lib/chars";
import styles from "../../styles/layout.module.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Axios from "axios";

export async function getStaticPaths() {
  const allData = await getAllData();
  const paths = allData.map((c) => ({
    params: { id: c.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const charResp = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const charData = await charResp.json();

  return {
    props: {
      charData,
    },
    revalidate: 604800,
  };
}

export default function CharactersDetails({ charData }) {
  const { uid } = useContext(UserContext);
  const { data: favIDs } = useSWR(`/api/user/${uid}`, (url) =>
    Axios(url).then((r) => r.data.data.favorite)
  );

  const handleFavorite = async (cid, cname) => {
    // If this character is already one of user's favorites, REMOVE it
    if (favIDs.includes(cid)) {
      if (
        window.confirm(
          `Are you sure you want to remove ${cname} from favorite?`
        )
      ) {
        await Axios.put(`/api/user/${uid}`, {
          favorite: favIDs.filter((p) => p !== cid),
        })
          .then((res) => console.log("DB updated:", res.data.data.favorite))
          .catch((error) => console.log("Failed to update DB:", error));
      }
    }

    // If this character is NOT yet a user's favorite, ADD it
    else {
      await Axios.put(`/api/user/${uid}`, {
        favorite: favIDs.concat(cid),
      })
        .then((res) => console.log("DB updated:", res.data.data.favorite))
        .catch((error) => console.log("Failed to update DB:", error));
    }

    trigger(`/api/user/${uid}`);
  };

  return (
    <Layout>
      <title>{charData.name} | Rick and Morty Character Tracker</title>
      <article>
        <div
          className={styles.favorite}
          onClick={() => handleFavorite(charData.id, charData.name)}
        >
          {favIDs && favIDs.includes(charData.id) ? (
            <div title="Remove from favorite">
              <StarIcon color="primary" fontSize="large" />
            </div>
          ) : (
            <div title="Add to favorite">
              <StarBorderIcon color="disabled" fontSize="large" />
            </div>
          )}
        </div>
        <img src={charData.image}></img>
        <h1 className={styles.headingXl}>{charData.name}</h1>
        <div className={styles.lightText}>
          Location: {charData.location.name}
        </div>
        <div>Status: {charData.status}</div>
        <div>Species: {charData.species}</div>
        <div>Gender: {charData.gender}</div>
        <div>Type: {charData.type}</div>
        <div>Origin: {charData.origin.name}</div>
      </article>
    </Layout>
  );
}
