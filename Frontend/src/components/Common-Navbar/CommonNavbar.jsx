import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './CommonNavbar.module.css'; 
import userIcon from '../../assets/userIcon.png'

const CommonNavbar = () => {
  // Access user state from Redux store
  const user = useSelector((state) => state.auth.user);

  return (
    <Navbar bg="light" className="justify-content-between p-3 ">
      <Navbar.Brand>Welcome Back 👋</Navbar.Brand>
      
      {/* User Info Section */}
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
