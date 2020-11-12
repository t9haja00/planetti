import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const SettingsNavBar = () => {
  return (
      <Nav justify variant="tabs">
        <Nav.Item>
          <Nav.Link as={Link} to='/user-settings/user-profile'>
          Change name or email
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/user-settings/change-password'>
          Change password
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/user-settings/delete-account'>
          Delete account
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
}

export default SettingsNavBar;