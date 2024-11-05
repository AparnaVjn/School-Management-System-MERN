import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './CommonNavbar.module.css';
import userIcon from '../../assets/userIcon.png';

const CommonNavbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Navbar bg="light" className={`${styles.customNavbar} justify-content-between p-3`}>
      <Navbar.Brand className="d-none d-lg-block"> 
        Welcome Back 👋
      </Navbar.Brand>

      <Nav className="ml-auto d-flex align-items-center">
        {user && (
          <>
            <img 
              src={userIcon} 
              alt="User Logo"
              className={styles.userLogo} 
            />
            <div className={styles.userInfo + " ml-2"}> 
              <span>{user.name}</span> <br />
              <small>{user.role}</small>
            </div>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default CommonNavbar;
