import React, { useEffect } from "react";
import "../styles/globals.css";
import { StateProvider, useStateValue } from "../context/StateProvider";
import reducer, { initialState } from "../context/reducer";

function MyApp({ Component, pageProps }) {

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
