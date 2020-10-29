import { getPartData } from "../lib/chars";
import Home from "../components/home";
import { useContext, useEffect, useState } from "react";
import UserContext from "../components/userContext";
import { useRouter } from "next/router";
import Axios from "axios";
import useSWR from "swr";

/*
export async function getServerSideProps(context) {
  //   console.log("-------------This is in filter page!---------------")
  //   console.log(" context.resolvedUrl in filter page!: ", context.resolvedUrl)
  const query = context.query;
  const allCharData = await getPartData(query);
  return {
    props: {
      allCharData,
    },
  };
}
*/
/*
const getAllChar = async (query) => {
  try {
    const res = await Axios.get("/api/characters", query);
    console.log("res:", res);
    return res.data;
  } catch (error) {
    console.log("Failed getting data using api:", error);
  }
};
*/
// export default function HomeFilter({}) {
export default function HomeFilter({}) {
  const [partCharData, setPartCharData] = useState();

  const { user, uid } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
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
    <>
      <p>filter page</p>
      {data ? <Home allCharData={data} /> : <div>Loading...</div>}
    </>
  );
}
