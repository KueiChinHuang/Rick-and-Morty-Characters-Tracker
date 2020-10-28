import { getAllData } from "../lib/chars";
import Home from "../components/home";
import auth0 from "../utils/auth0";

/*
export async function getServerSideProps(context) {
//   console.log("-------------This is in filter page!---------------")
//   console.log(" context.resolvedUrl in filter page!: ", context.resolvedUrl)
  const query = context.resolvedUrl
  const allCharData = await getAllData(query)
  return {
    props: {
      allCharData
    }
  }
}
*/

export async function getServerSideProps({ req, res, resolvedUrl }) {
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: "/api/login",
      });
      res.end();
      return;
    }
    const user = session.user;
    console.log(session);

    const query = resolvedUrl;
    const allCharData = await getAllData(query);

    return {
      props: {
        user,
        allCharData,
        // accessToken,
      },
    };
  }
}

export default function HomeFilter({ user, allCharData }) {
  // console.log("accessToken: ", accessToken);
  return <Home allCharData={allCharData} />;
}
