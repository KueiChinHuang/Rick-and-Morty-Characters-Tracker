import { getAllData } from "../lib/chars";
import Home from "../components/home";
import Header from "../components/header";

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
    <div>
      <Header />
      <Home allCharData={allCharData} />
    </div>
  );
}
