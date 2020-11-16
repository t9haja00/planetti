import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styles from '../../assets/css/settings-navbar.module.css';

const SettingsNavBar = () => {
  return (
      <Nav 
        variant='tabs' 
        className={`${styles.sidebar} flex-column`}>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to='/user-settings/user-profile'
            className={`${styles['sidebar-link']} border-0`}>
          Change name or email
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to='/user-settings/change-password'
            className={styles['sidebar-link']}>
          Change password
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to='/user-settings/delete-account'
            className={styles['sidebar-link']}>
          Delete account
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
}

export default SettingsNavBar;