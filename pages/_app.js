import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/userContext';

export default class MyApp extends App {
  state = {
    user: null, 
    password: null
  };

  componentDidMount = () => {
    const user = localStorage.getItem('coolapp-user');
    const password = localStorage.getItem('coolapp-password');
    if (user) {
      this.setState({
        user,
        password
      });
    } else {
      Router.push('/signin');
    }
  };

  signIn = (username, password) => {
    localStorage.setItem('coolapp-user', username);
    localStorage.setItem('coolapp-password', password);

    this.setState(
      {
        user: username,
        password: password
      },
      () => {
        Router.push('/');
      }
    );
  };

  signOut = () => {
    localStorage.removeItem('coolapp-user');
    localStorage.removeItem('coolapp-password');
    this.setState({
      user: null,
      password: null
    });
    Router.push('/signin');
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider value={{ user: this.state.user, password: this.state.password, signIn: this.signIn, signOut: this.signOut }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}
