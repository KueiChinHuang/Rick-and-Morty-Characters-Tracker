import { getAllData } from "../lib/chars";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Axios from "axios";
import useSWR from "swr";
import Filter from "../components/Filter";
import Cards from "../components/Cards";
import { useStateValue } from "../context/StateProvider";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import styles from "../styles/layout.module.css";

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
  const [{ user, characters, options }, dispatch] = useStateValue();

  // Get the filter result using swr
  const router = useRouter();
  const { data } = useSWR(
    `https://rickandmortyapi.com/api/character/${router.asPath}`,
    fetcher
  );

  useEffect(() => {
    dispatch({
      type: "SET_CHARACTERS",
      payload: {
        characters: allCharData,
      },
    });
  }, []);

  return (
    <Layout home>
      <title>Rick and Morty Character Tracker</title>

      <Filter />

      {/* If filter result not exist, show all the data */}
      {!data ? (
        <section>
          <Cards characterData={allCharData} />
        </section>
      ) : (
        <section>
          {/* When data length is 0, it means there is no results from external API. */}
          {data.length === 0 ? (
            <h3>No results. Please try again.</h3>
          ) : (
            <Cards characterData={data} />
          )}
        </section>
      )}
      <div className={styles.btnTop}>
        <Button
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          To the Top
        </Button>
      </div>
    </Layout>
  );
}
