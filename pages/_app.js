import React, { useEffect, useState } from "react";
import App from "next/app";
import Router from "next/router";
import UserContext from "../components/UserContext";
import "../styles/globals.css";
import { StateProvider } from "../context/StateProvider";
import reducer, { initialState } from "../context/reducer";

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
    Router.push("/");
  };

  const signOut = () => {
    setUser();
    setUid();
    Router.push("/");
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
