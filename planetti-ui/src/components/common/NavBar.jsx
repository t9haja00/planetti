import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import styles from '../../assets/css/navbar.module.css';

const NavBar = ({ siteName = '', user, onLogout }) => {

  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar variant="dark" expanded={expanded} className={styles.navbar}>
      <Navbar.Brand>
        <Link className={styles['navbar-brand']} to='/' onClick={() => setExpanded(false)}>
          {siteName}
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(expanded ? false : "expanded")} />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {!user &&
            <>
              <Link
                className={`${styles.login } ${styles['navbar-link']} btn mx-1`}
                to='/Login'
                name='Login'
                onClick={() => setExpanded(false)}>Sign in</Link>
              <Link
                className={`${styles.join} ${styles['navbar-link']} btn rounded-pill mx-1`}
                to='/Join'
                name='Join'
                onClick={() => setExpanded(false)}>Sing up</Link>
            </>
          }
          {user &&
            <>
              <button
                className='border rounded-sm mx-1'
                name='user'>
                {user}
              </button>
              <button
                className='border rounded-sm mx-1'
                name='Logout'
                onClick={onLogout}>Logout</button>
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;