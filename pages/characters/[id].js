import Layout from "../../components/Layout";
import { getAllData, getOptions } from "../../lib/chars";
import styles from "../../styles/layout.module.css";
import Favorite from "../../components/Favorite";
import Comments from "../../components/Comments";

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
  const options = await getOptions();

  return {
    props: {
      charData,
      options,
    },
    revalidate: 604800,
  };
}

export default function CharactersDetails({ charData, options }) {
  return (
    <Layout>
      <title>{charData.name} | Rick and Morty Character Tracker</title>
      <article>
        {console.log("use lib to import options:", options)}
        <Favorite character={charData} />
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
        <Comments cid={charData.id} options={options}/>
      </article>
    </Layout>
  );
}
