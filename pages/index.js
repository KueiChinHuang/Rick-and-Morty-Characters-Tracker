import { getAllData } from "../lib/chars";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Axios from "axios";
import useSWR from "swr";
import Filter from "../components/Filter";
import UserContext from "../components/UserContext";
import { useContext } from "react";
import Cards from "../components/Cards";

export async function getStaticProps() {
  const allCharData = await getAllData();
  return {
    props: {
      allCharData,
    },
    revalidate: 604800,
  };
}

const fetcher = async (nextUrl) => {
  try {
    let characters = [];
    while (nextUrl !== null) {
      const charsResp = await Axios(nextUrl).then((r) => r.data);
      nextUrl = charsResp.info?.next || null;
      characters = [...characters, ...charsResp.results];
    }
    return characters;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default function Index({ allCharData }) {
  const { uid } = useContext(UserContext);
  const router = useRouter();
  const { data } = useSWR(
    `https://rickandmortyapi.com/api/character/${router.asPath}`,
    fetcher
  );

  return (
    <Layout home>
      <title>Rick and Morty Character Tracker</title>

      {uid && <Filter />}
      {!data ? (
        <section>
          <Cards characterData={allCharData} />
        </section>
      ) : (
        <section>
          {data.length === 0 ? <h3>No results. Please try again :) </h3> : null}
          <Cards characterData={data} />
        </section>
      )}
    </Layout>
  );
}
