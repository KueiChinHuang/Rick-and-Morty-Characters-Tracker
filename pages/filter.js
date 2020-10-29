import { getAllData } from "../lib/chars";
import Home from "../components/home";
import { useContext, useEffect } from "react";
import UserContext from "../components/userContext";
import { useRouter } from "next/router";


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
  const res = await Axios.get("/api/characters", query);
  console.log("res:", res);
  return res.data;
};
*/
// export default function HomeFilter({}) {

export default function HomeFilter({ allCharData }) {
  const { user, signOut } = useContext(UserContext);
  const router = useRouter();
  // console.log("router:", router);
  // console.log("router.query: ", router.query);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  // const allCharData = getAllChar(router.query);

  return <Home allCharData={allCharData} />;
}
