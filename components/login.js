import Link from "next/link";
import auth0 from "../utils/auth0";
/*
export async function getServerSideProps({ req, res }) {
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: "/api/login",
      });
      res.end();
      return;
    }

    return {
      props: {
        user: session.use,
      },
    };
  }
}
*/

export default function Login({ user }) {
  /*
      const session = await auth0.getSession(req);
      if (!session || !session.user) {
        res.writeHead(302, {
          Location: "/api/login",
        });
        res.end();
        return;
      }
  
      return {
        props: {
          user: session.use,
        },
      };
   */

  return (
    <div>
      <Link href="/api/login">
        <a>Login</a>
      </Link>
      <Link href="/api/logout">
        <a>Logout</a>
      </Link>
    </div>
  );
}
