import { getAllData } from "../lib/chars";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Axios from "axios";
import useSWR from "swr";
import Filter from "../components/Filter";
import UserContext from "../components/UserContext";
import { useContext } from "react";
import Cards from "../components/Cards";

// Get all the data as static data, to show all the characters when user first come to this site
export async function getStaticProps() {
  const allCharData = await getAllData();
  return {
    props: {
      allCharData,
    },
    revalidate: 604800,
  };
}

// A fetcher for swr filtering the data
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
  // Get user's id
  const { uid } = useContext(UserContext);

  // Get the filter result using swr
  const router = useRouter();
  const { data } = useSWR(
    `https://rickandmortyapi.com/api/character/${router.asPath}`,
    fetcher
  );

  return (
    <Layout home>
      <title>Rick and Morty Character Tracker</title>

      {/* User needs to login to filter */}
      {uid && <Filter />}

      {/* If filter result is not exist, show all the data */}
      {!data ? (
        <section>
          <h1>Sign in to filter the characters! :) </h1>
          <Cards characterData={allCharData} />
        </section>
      ) : (
        <section>
          {/* When data length is 0, it means there is no results from external API. */}
          {data.length === 0 ? (
            <h3>No results. Please try again :) </h3>
          ) : (
            <Cards characterData={data} />
          )}
        </section>
      )}
    </Layout>
  );
}
