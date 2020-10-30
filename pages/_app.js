import React, { useEffect, useState } from "react";
import App from "next/app";
import Router from "next/router";
import UserContext from "../components/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [uid, setUid] = useState();

  useEffect(() => {
    if (user) {
      setUser();
      setUid();
    } else {
      Router.push("/");
    }
  }, []);

  const signIn = (username, uid) => {
    setUser(username);
    setUid(uid);
    Router.push("/filter");
  };

  const signOut = () => {
    setUser();
    setUid();
    Router.push("/");
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        uid: uid,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
