import React from "react";
import App from "next/app";
import Router from "next/router";
import UserContext from "../components/userContext";

export default class MyApp extends App {
  state = {
    user: null,
    uid: null,
  };

  componentDidMount = () => {
    const user = localStorage.getItem("coolapp-user");
    const uid = localStorage.getItem("coolapp-uid");
    if (user) {
      this.setState({
        user,
        uid,
      });
    } else {
      Router.push("/signin");
    }
  };

  signIn = (username, uid) => {
    localStorage.setItem("coolapp-user", username);
    localStorage.setItem("coolapp-uid", uid);

    this.setState(
      {
        user: username,
        uid: uid,
      },
      () => {
        Router.push("/");
      }
    );
  };

  signOut = () => {
    localStorage.removeItem("coolapp-user");
    localStorage.removeItem("coolapp-uid");
    this.setState({
      user: null,
      uid: null,
    });
    Router.push("/signin");
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          uid: this.state.uid,
          signIn: this.signIn,
          signOut: this.signOut,
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}
