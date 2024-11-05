import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../slices/staffSlice'; 
import { logout } from '../../../slices/authSlice'; 
import { useNavigate } from 'react-router-dom'; 

 
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
      className={`d-flex flex-column justify-content-between bg-light p-3 ${
        sidebarVisible ? 'position-fixed vh-100' : 'd-none d-lg-flex vh-100'
      }`}
      style={{
        position: 'fixed',
        top:0,
        left:0,
        zIndex: 1040,
        width: '250px',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
    <div>
      <h4 className="mb-4 mt-2">ABC Public School</h4>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Link onClick={() => handleNavClick('dashboard')}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('add-students')}>Add Students</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('students-list')}>Students List</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('library')}>Library</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('make-payment')}>Make a Payment</Nav.Link>
          <Nav.Link onClick={() => handleNavClick('payment-history')}>Payment History</Nav.Link>
        </Nav>
    </div>
    <div>
    <Nav.Link
      onClick={() => handleLogout()}
      className="text-danger mt-auto"
    >
      Logout
    </Nav.Link>
  </div>
    </div>
  );
};

export default SideBar;
