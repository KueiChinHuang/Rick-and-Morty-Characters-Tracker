import Home from "../components/home";
import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import UserContext from "../components/userContext";
import { useRouter } from "next/router";
import Axios from "axios";
import useSWR from "swr";

export default function HomeFilter({}) {
  const { uid } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!uid) {
      router.push("/");
    }
  }, []);

  const { data } = useSWR(
    `https://rickandmortyapi.com/api/character/${router.asPath.slice(7)}`,
    async (nextUrl) => {
      let characters = [];

      while (nextUrl !== null) {
        const charsResp = await Axios(nextUrl).then((r) => r.data);
        nextUrl = charsResp.info?.next || null;
        characters = [...characters, ...charsResp.results];
      }
      return characters;
    }
  );

  return (
    <Layout home>
      <title>Rick and Morty Character Tracker</title>
      {data ? <Home allCharData={data} /> : <div>Loading...</div>}
    </Layout>
  );
}
