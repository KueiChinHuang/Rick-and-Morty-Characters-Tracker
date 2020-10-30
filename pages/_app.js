import App from "next/app";
import reducer, { initialState } from "../context/reducer";
import { StateProvider } from "../context/StateProvider";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    );
  }
}

export default MyApp;
