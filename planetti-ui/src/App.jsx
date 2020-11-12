/* Packages
------------*/
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

/* Components
--------------*/
import NavBar from './components/common/NavBar';
import NotLogged from './components/NotLogged';
import Signin from './components/Signin';
import UserSettings from './components/UserSettings';
import Footer from './components/common/Footer';

/* Styles
----------*/
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    let userInfo = localStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);

    setLoggedIn(userInfo);

  }, [setLoggedIn]);

  const handleSignin = () => {
    let userInfo = localStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);

    setLoggedIn(userInfo);
  };

  return (
    <>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover={false}
        pauseOnFocusLose={false}
        closeButton={false}
        limit={1}
      />
      <NavBar
        siteName="Planetti"
        userInfo={loggedIn && loggedIn.name}
      />
      <Switch>
        <Route path='/login' render={routeProps =>
          <Signin signin={handleSignin} {...routeProps} />} />
        <Route path='/user-settings' render={() => loggedIn && <UserSettings />} />
        <Route path='/' render={routeProps => {
          if (!loggedIn) return <NotLogged {...routeProps} />
          return <h1>logged</h1>
        }} />
      </Switch>
      <Footer />
    </>
  )
}

export default App;
