import { getPartData } from "../lib/chars";
import Home from "../components/home";
import { useContext, useEffect } from "react";
import UserContext from "../components/userContext";
import { useRouter } from "next/router";
import Axios from "axios";
/*
export async function getServerSideProps(context) {
  //   console.log("-------------This is in filter page!---------------")
  //   console.log(" context.resolvedUrl in filter page!: ", context.resolvedUrl)
  const query = context.resolvedUrl;
  const allCharData = await getAllData(query);
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
export default function HomeFilter({}) {
  // export default function HomeFilter({ allCharData }) {

  const { user, uid } = useContext(UserContext);
  const router = useRouter();
  // console.log("router:", router);
  console.log("router.query: ", router.query);

  let allCharData = {};

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    const getData = async () => {
      allCharData = await getPartData(router.query);
      console.log("allCharData:", allCharData);
    };
    console.log("in use effect, allCharData:", allCharData);

    getData();
  }, [user]);

  // const allCharData = getAllChar(router.query);

  return <>filter page{/* <Home allCharData={allCharData} uid={uid} /> */}</>;
}
