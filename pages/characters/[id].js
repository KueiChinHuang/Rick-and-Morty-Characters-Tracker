import Layout from "../../components/Layout";
import { getFirstPageData } from "../../lib/chars";
import styles from "../../styles/details.module.css";
import FavStar from "../../components/FavStar";
import Comments from "../../components/Comments";
import { cache } from "swr";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStateValue } from "../../context/StateProvider";
import ReactLoading from "react-loading";

export async function getStaticPaths() {
  const firstPageData = await getFirstPageData();
  const paths = firstPageData.map((c) => ({
    params: { id: c.id.toString() },
  }));

  return {
    paths,
    fallback: true,
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
    revalidate: 1,
  };
}

export default function CharactersDetails({ charData }) {
  const [{ username }, dispatch] = useStateValue();
  const router = useRouter();

  useEffect(() => {
    window.scroll({
      top: 300,
      behavior: "smooth",
    });
  }, [charData]);

  return (
    <Layout>
      {router.isFallback ? (
        <div className={styles.loadingContainer}>
          <ReactLoading type={"bubbles"} color={"lightblue"} width={"20%"} />
        </div>
      ) : (
        <div>
          <title>{charData.name} | Rick and Morty Character Tracker</title>
          <div className={styles.characterInfo}>
            {/* <div className={styles.starContainer}></div> */}
            <img src={charData.image}></img>
            <div className={styles.title}>
              <h1 className={styles.headingXl}>{charData.name}</h1>

              {/* User can manage favorite only when they login */}
              {username ? <FavStar character={charData} /> : null}
            </div>
            <div className={styles.content}>
              <div className={styles.lightText}>
                Location: {charData.location.name}
              </div>
              <div>Status: {charData.status}</div>
              <div>Species: {charData.species}</div>
              <div>Gender: {charData.gender}</div>
              <div>Type: {charData.type}</div>
            </div>
          </div>
          <Comments cid={charData.id} />
        </div>
      )}
    </Layout>
  );
}
