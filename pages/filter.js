import Home from "../components/Home";
import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import UserContext from "../components/UserContext";
import { useRouter } from "next/router";
import Axios from "axios";
import useSWR from "swr";
import Filter from "../components/Filter";

export default function HomeFilter({}) {
  const { uid } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!uid) {
      router.push("/");
    }
  }, []);

  const { data } = useSWR(
    `https://rickandmortyapi.com/api/character/${router.asPath}`,
    async (nextUrl) => {
      let characters = [];
      try {
        while (nextUrl !== null) {
          const charsResp = await Axios(nextUrl).then((r) => r.data);
          nextUrl = charsResp.info?.next || null;
          characters = [...characters, ...charsResp.results];
        }
        return characters;
      } catch (error) {
        console.log("Can't get the external data", error.response);
      }
    }
  );

  return (
    <Layout home>
      <title>Rick and Morty Character Tracker</title>
      {data ? <Home allCharData={data} /> : <div>Loading...</div>}
    </Layout>
  );
}
