/* Packages
------------*/
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Jumbotron } from 'react-bootstrap';

/* Components
--------------*/
import NavBar from './components/common/NavBar';
import Signup from './components/Signup';

/* Styles
----------*/
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user, setUser } = useState(null);

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
      {!user &&
        <>
          <div
            className="container position-absolute py-2"
            style={{ left: 0, right: 0 }}>
            <NavBar
              siteName="Planetti"
              user={null}
              onLogout="" />
          </div>
          <Jumbotron>
            <div className="container-lg">
              <div
                className="d-flex align-items-center gutter-md-spacious">
                <div className="col-7 text-center">
                  <p className="h1 text-wrap">Schedule generator for everyone</p>
                </div>
                <div className="col-5">
                  <Signup />
                </div>
              </div>
            </div>
          </Jumbotron>
        </>
      }
    </>
  )
}

export default App;
