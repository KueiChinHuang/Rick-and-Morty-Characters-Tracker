import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/userContext';

export default class MyApp extends App {
  state = {
    user: null, 
    password: null,
    uid: null
  };

  componentDidMount = () => {
    const user = localStorage.getItem('coolapp-user');
    const password = localStorage.getItem('coolapp-password');
    const uid = localStorage.getItem('coolapp-uid');
    if (user) {
      this.setState({
        user,
        password,
        uid
      });
    } else {
      Router.push('/signin');
    }
  };

  signIn = (username, password, uid) => {
    localStorage.setItem('coolapp-user', username);
    localStorage.setItem('coolapp-password', password);
    localStorage.setItem('coolapp-uid', uid);

    this.setState(
      {
        user: username,
        password: password,
        uid: uid
      },
      () => {
        Router.push('/');
      }
    );
  };

  signOut = () => {
    localStorage.removeItem('coolapp-user');
    localStorage.removeItem('coolapp-password');
    localStorage.removeItem('coolapp-uid');
    this.setState({
      user: null,
      password: null,
      uid: null
    });
    Router.push('/signin');
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider value={{ user: this.state.user, password: this.state.password, uid: this.state.uid, signIn: this.signIn, signOut: this.signOut }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}
