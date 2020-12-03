/* Packages
------------*/
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

/* Components
--------------*/
import NavBar from "./components/common/NavBar";
import Signin from "./components/Signin";
import NotLogged from "./components/NotLogged";
import UserPage from "./components/Userpage";
import ViewSchedule from "./components/ViewSchedule";
import UserSettings from "./components/UserSettings";
import Footer from "./components/common/Footer";
import NewSchedule from "./components/NewSchedule";
/* Styles
----------*/
import "react-toastify/dist/ReactToastify.css";
import styles from "./assets/css/main-page.module.css";

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

  const handleProfileChanged = () => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    toast.dark("Saved successfully!");
    setLoggedIn(userInfo);
  };

  const handleAccountDelete = () => {
    toast.dark("Your account has been deleted successfully!");
    setLoggedIn(null);
  };

  return (
    <>
      <div className={styles.wrap}>
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
            path="/new-schedule"
            render={(routeProps) => <NewSchedule {...routeProps} />}
          />
          <Route
            path="/login"
            render={(routeProps) => (
              <Signin signin={handleSignin} {...routeProps} />
            )}
          />
          <Route
            path="/view-schedule/:uuid"
            render={(routeProps) => <ViewSchedule {...routeProps} />}
          />
          <Route
            path="/user-settings"
            render={(routeProps) =>
              loggedIn && (
                <UserSettings
                  deleteFeedBack={handleAccountDelete}
                  profileFeedBack={handleProfileChanged}
                  {...routeProps}
                />
              )
            }
          />
          <Route
            path="/"
            exact
            render={(routeProps) => {
              if (!loggedIn) return <NotLogged {...routeProps} />;
              return <UserPage />;
            }}
          />
          {/* <Route
          path="*"
          render={() => <h1>Not Found</h1>} /> */}
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
