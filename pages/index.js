import { getAllData } from "../lib/chars";
import Cards from "../components/Cards";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Axios from "axios";
import useSWR from "swr";

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
  let characters = [];
  while (nextUrl !== null) {
    const charsResp = await Axios(nextUrl).then((r) => r.data);
    nextUrl = charsResp.info?.next || null;
    characters = [...characters, ...charsResp.results];
  }
  return characters;
};

export default function HomeIndex({ allCharData }) {
  const router = useRouter();
  const { data } = useSWR(
    `https://rickandmortyapi.com/api/character/${router.asPath}`,
    fetcher
  );

  return (
    <Layout home>
      <title>Rick and Morty Character Tracker</title>
      {!data ? (
        <Cards allCharData={allCharData} />
      ) : (
        <Cards allCharData={data} />
      )}
    </Layout>
  );
}
