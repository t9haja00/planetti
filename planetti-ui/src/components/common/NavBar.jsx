import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from '../../assets/css/navbar.module.css';

const NavBar = ({ siteName = '', user, onLogout }) => {

  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  const handleHideMenu = () => {
    setShowMenu(false);
  }

  let containerStyle = "";
  const notLoggedIn = (() => {
    if (!user && location.pathname !== '/login') {
      containerStyle = "container position-absolute py-2";
      return (
        <>
          <Link
            className={`${styles.login} ${styles['navbar-link']} btn mx-1`}
            to='/login'
            name='login'
            >Sign in</Link>
          <Link
            className={`${styles.join} ${styles['navbar-link']} btn rounded-pill mx-1`}
            to='/join'
            name='join'
            >Sing up</Link>
        </>
      );
    }
  })();

  const loggedIn = (() => {
    if (user) {
      return (
        <NavDropdown 
          title={user} 
          id="basic-nav-dropdown" 
          className={`${styles['nav-dropdown']}`}
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
          <NavDropdown.Divider />
          <NavDropdown.Item >
           <button
             name='logout'
             onClick={onLogout}>Sign out</button>
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  })();

  return (
    <div className={containerStyle} style={{ right: 0, left: 0 }}>
      {location.pathname === '/login' &&
        <div className="text-center pt-4 pb-3">
          <Link to="/" className="text-decoration-none">
            <p className={styles['navbar-brand']}>Planetti</p>
          </Link>
        </div>
      }
      {location.pathname !== '/login' &&
        <Navbar variant="light" className={`${styles.navbar} justify-content-between`}>
          <Navbar.Brand>
            <Link className={styles['navbar-brand']} to='/'>
              {siteName}
            </Link>
          </Navbar.Brand>
          <Nav>
            {notLoggedIn}
            {loggedIn}
          </Nav>
        </Navbar>
      }
    </div>
  );
}

export default NavBar;