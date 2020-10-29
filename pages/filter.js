import { getAllData } from "../lib/chars";
import Home from "../components/home";
import { useContext } from "react";
import UserContext from "../components/userContext";
import { useRouter } from "next/router";

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

export default function HomeFilter({ allCharData }) {
  const { user, signOut } = useContext(UserContext);
  const router = useRouter();

  if (!user) {
    router.push("/signin");
  }

  return <Home allCharData={allCharData} />;
}
