import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../slices/staffSlice'; 
import { logout } from '../../../slices/authSlice'; 
import { useNavigate } from 'react-router-dom'; 
import styles from './SideBar.module.css';

 
const SideBar = ({ sidebarVisible, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    if (window.innerWidth < 992) {  
      toggleSidebar();
    }
  };
  const handleNavClick = (component) => {
    dispatch(setComponent(component));
    if (window.innerWidth < 992) {  
      toggleSidebar();
    }
  };

  return (
    <div
      className={`${styles.sidebar} ${
        sidebarVisible ? 'position-fixed vh-100' : 'd-none d-lg-flex vh-100'
      }`}
    >
      <div className={styles.logo}>
        <h4>ABC Public School</h4>
      </div>
        <Nav defaultActiveKey="/dashboard" className={styles.nav}>
          <Nav.Link onClick={() => handleNavClick('dashboard')}  className={styles.navLink}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('add-students')}  className={styles.navLink}>Add Students</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('students-list')}  className={styles.navLink}>Students List</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('library')}  className={styles.navLink}>Library</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('make-payment')}  className={styles.navLink}>Make a Payment</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('payment-history')}  className={styles.navLink}>Payment History</Nav.Link>
        </Nav>
    <div className={styles.footer}>
        <Nav.Link onClick={handleLogout} className={`${styles.navLink} ${styles.logout}`}>
          Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default SideBar;
