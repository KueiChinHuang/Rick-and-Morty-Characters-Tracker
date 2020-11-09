import Layout from "../../components/Layout";
import { getAllData, getOptions } from "../../lib/chars";
import styles from "../../styles/layout.module.css";
import FavStar from "../../components/FavStar";
import Comments from "../../components/Comments";
import { cache } from "swr";
import { useEffect } from "react";

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
  const allOptions = await getOptions();
  const options = allOptions.filter((o) => o.value !== charData.id);

  return {
    props: {
      charData,
      options,
    },
    revalidate: 604800,
  };
}

export default function CharactersDetails({ charData, options }) {
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

  return (
    <Layout>
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
    </Layout>
  );
}
