import Layout from "../../components/Layout";
import { getFirstPageData, getOptions } from "../../lib/chars";
import styles from "../../styles/layout.module.css";
import FavStar from "../../components/FavStar";
import Comments from "../../components/Comments";
import { cache } from "swr";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStateValue } from "../../context/StateProvider";

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
  const router = useRouter();
  const [{ user, characters, options }, dispatch] = useStateValue();

  useEffect(() => {
    cache
      .keys()
      .filter((key) =>
        key.startsWith(
          cache
            .serializeKey(["https://rickandmortyapi.com/api/character/"])
            .forEach((key) => cache.delete(key))
        )
      );
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          <title>{charData.name} | Rick and Morty Character Tracker</title>
          <article>
            <FavStar character={charData} />
            <img src={charData.image}></img>
            <h1 className={styles.headingXl}>{charData.name}</h1>
            <div className={styles.lightText}>
              Location: {charData.location.name}
            </div>
            <div>Status: {charData.status}</div>
            <div>Species: {charData.species}</div>
            <div>Gender: {charData.gender}</div>
            <div>Type: {charData.type}</div>
            <Comments cid={charData.id} options={options} />
          </article>
        </>
      )}
    </Layout>
  );
}
