import { getAllData } from "../lib/chars";
import Home from "../components/home";
import { useContext } from "react";
import UserContext from "../components/userContext";
import Head from "next/head";
import Layout from "../components/layout";

export async function getStaticProps() {
  // console.log("-------------This is in index page!---------------")
  const allCharData = await getAllData("");
  return {
    props: {
      allCharData,
    },
    revalidate: 604800,
  };
}

export default function HomeIndex({ allCharData }) {
  return (
    <Layout home>
      <Home allCharData={allCharData} />
    </Layout>
  );
}
