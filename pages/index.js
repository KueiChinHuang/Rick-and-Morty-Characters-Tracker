import { getAllData } from "../lib/chars";
import Home from "../components/home";
import Layout from "../components/Layout";

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
      <title>Rick and Morty Character Tracker | Kuei-Chin Huang</title>
      <Home allCharData={allCharData} />
    </Layout>
  );
}
