import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styles from '../../assets/css/settings-navbar.module.css';

const SettingsNavBar = () => {

  const location = useLocation();

  const activeClass = `${styles['sidebar-link']} ${styles['sidebar-link-active']}`;

  const profilePath = '/user-settings/user-profile';
  const passwordPath = '/user-settings/change-password';
  const deletePath = '/user-settings/delete-account';
    
  return (
      <Nav 
        variant='tabs' 
        className={`${styles.sidebar} flex-column`}>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to={profilePath}
            className={location.pathname === profilePath ? 
            activeClass : `${styles['sidebar-link']}`}>
          Change name or email
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to={passwordPath}
            className={location.pathname === passwordPath ?
            activeClass : `${styles['sidebar-link']}`}>
          Change password
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to={deletePath}
            className={location.pathname === deletePath ? 
            activeClass : `${styles['sidebar-link']}`}>
          Delete account
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
}

export default SettingsNavBar;