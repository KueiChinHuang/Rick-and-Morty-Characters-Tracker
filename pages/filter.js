import { getPartData } from "../lib/chars";
import Home from "../components/home";
import { useContext, useEffect, useState } from "react";
import UserContext from "../components/userContext";
import { useRouter } from "next/router";
import Axios from "axios";
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
  // console.log("router:", router);
  console.log("router.query: ", router.query);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    const getData = async () => {
      const data = await getPartData(router.query);
      console.log("data:", data);
      setPartCharData(data);
    };

    console.log("in use effect, partCharData:", partCharData);
    getData();
  }, []);

  return (
    <>
      <p>filter page</p>
      {console.log("should load the data:", partCharData)}
      {partCharData ? (
        <Home allCharData={partCharData} uid={uid} />
      ) : (
        <div>No Data</div>
      )}
    </>
  );
}
