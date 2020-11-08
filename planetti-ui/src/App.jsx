/* Packages
------------*/
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

/* Components
--------------*/
import NotLogged from './components/NotLogged';
import Signin from './components/Signin';
import Footer from './components/common/Footer';

/* Styles
----------*/
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user, setUser } = useState();

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
      <Switch>
        <Route path='/login' render={routeProps =>
          <Signin  {...routeProps} />} />
        <Route path='/' render={() => {
          if (!user) return <NotLogged />
          return <h1>logged</h1>
        }} />
      </Switch>
      <Route path='*' render={routerProps =>
        <Footer {...routerProps} />} />
    </>
  )
}

export default App;
