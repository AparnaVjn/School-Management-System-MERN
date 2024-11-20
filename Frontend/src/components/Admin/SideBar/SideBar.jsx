import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../slices/adminSlice';
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
        <Nav.Link
          onClick={() => handleNavClick('dashboard')}
          className={styles.navLink}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavClick('staff')}
          className={styles.navLink}
        >
          Office Staff
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavClick('students')}
          className={styles.navLink}
        >
          Students
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavClick('library')}
          className={styles.navLink}
        >
          Librarian
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavClick('library-Data')}
          className={styles.navLink}
        >
          Library Data
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavClick('fee')}
          className={styles.navLink}
        >
          Fees
        </Nav.Link>
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
