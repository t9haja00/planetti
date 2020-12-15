import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from "../../assets/css/navbar.module.css";

const iconsUrl = process.env.REACT_APP_API;

const NavBar = ({ siteName = "", userName = null, onLogout = (f) => f }) => {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  let containerStyle = "container position-absolute py-2";
  const notLoggedIn = (() => {
    const { pathname } = location;

    // Home page/view schedule for non loggedin users
    if (!userName && pathname.toLowerCase() !== "/login") {
      if (pathname.includes("schedule")) containerStyle = "";

      return (
        <div className={containerStyle} style={{ right: 0, left: 0 }}>
          <Navbar
            variant="light"
            className={`${styles.navbar} justify-content-between`}
          >
            <Navbar.Brand>
              <Link className={styles["navbar-brand"]} to="/">
                {siteName}
              </Link>
            </Navbar.Brand>
            <Nav>
              <Link
                className={`${styles.login} ${styles["navbar-link"]} btn mx-1`}
                to="/login"
                name="login"
              >
                Sign in
              </Link>
              <Link
                className={`${styles.join} ${styles["navbar-link"]} btn rounded-pill mx-1`}
                to="/"
                name="join"
              >
                Sign up
              </Link>
            </Nav>
          </Navbar>
        </div>
      );
    }

    // login page
    return null;
  })();

  const loggedIn = (() => {
    if (userName) {
      return (
        <div style={{ right: 0, left: 0 }}>
          <Navbar
            variant="light"
            className={`${styles.navbar} justify-content-between`}
          >
            <Navbar.Brand>
              <Link className={styles["navbar-brand"]} to="/">
                <img
                  className={styles.icon}
                  src={`${iconsUrl}/icons/logo_white.svg`}
                  alt=""
                />
                {siteName}
              </Link>
            </Navbar.Brand>
            <Nav>
            <img
                  className={styles.iconUser}
                  src={`${iconsUrl}/icons/user_icon.svg`}
                  alt=""
                />
              <NavDropdown
                title={userName}
                className={`${styles["nav-dropdown"]}`}
                alignRight
                show={showMenu}
                onMouseEnter={handleShowMenu}
                onMouseLeave={handleHideMenu}
              >
                <NavDropdown.Item as={Link} to="/">
                  Main page
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user-settings/user-profile">
                  User settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/aboutus">
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/">
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <button onClick={onLogout}>Sign out</button>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </div>
      );
    }
  })();

  return (
    <>
      {notLoggedIn}
      {loggedIn}
    </>
  );
};

export default NavBar;
