// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import FoodBuilder from './containers/FoodBuilder';
import { Route, Routes } from 'react-router-dom';
import Checkout from './containers/Checkout';
import Auth from './containers/Authentication/Auth';
import Logout from './containers/Logout';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

class App extends Component {

  render() {

    let routes;
    if (this.props.isLoggedIn) {
      routes = (
        <Routes>
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/logout' element={<Logout />} />
          <Route index element={<FoodBuilder />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route index element={<FoodBuilder />} />
          <Route path='*' exact element={<Navigate to="/" />} />
        </Routes>
      );
    }

    return (
      <div className='bg-stone-100 pt-2'>
        <Layout>
          {routes}
        </Layout>
      </div>
    );

  }
}

const mapStateToPros = (state) => {
  return {
    isLoggedIn: state.auth.token !== null
  };
};

export default connect(mapStateToPros)(App);