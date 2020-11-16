/* Packages
------------*/
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

/* Components
--------------*/
import NavBar from "./components/common/NavBar";
import NotLogged from "./components/NotLogged";
import Signin from "./components/Signin";
import UserSettings from "./components/UserSettings";
import Footer from "./components/common/Footer";
import UserPage from "./components/Userpage";

/* Styles
----------*/
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    setLoggedIn(userInfo);
  }, [setLoggedIn]);

  const handleSignin = () => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    setLoggedIn(userInfo);
  };

  const handleSignout = () => {
    window.location = "/";
    toast.dark("You are now logged out!");
    localStorage.removeItem("userInfo");
    setLoggedIn(null);
  };

  const handleDelete = () => {
    toast.dark("Your account has been deleted successfully!");
    setLoggedIn(null);
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
        userName={loggedIn && loggedIn.name}
        onLogout={handleSignout}
      />
      <Switch>
        <Route
          path="/login"
          render={(routeProps) => (
            <Signin signin={handleSignin} {...routeProps} />
          )}
        />
        <Route
          path="/user-settings"
          render={() =>
            loggedIn && <UserSettings deleteFeedBack={handleDelete} />
          }
        />
        <Route
          path="/"
          render={(routeProps) => {
            if (!loggedIn) return <NotLogged {...routeProps} />;
            return <UserPage />;
          }}
        />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
