import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../slices/adminSlice'; 
import { logout } from '../../../slices/authSlice'; 
import { useNavigate } from 'react-router-dom'; 

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/'); 
  };

  return (
    <div className="d-flex flex-column bg-light vh-100 p-3">
      <h4 className="mb-4 mt-2">ABC Public School</h4>
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Link onClick={() => dispatch(setComponent('dashboard'))}>Dashboard</Nav.Link>
        <Nav.Link onClick={() => dispatch(setComponent('staff'))}>Office Staff</Nav.Link>
        <Nav.Link onClick={() => dispatch(setComponent('students'))}>Students</Nav.Link>
        <Nav.Link onClick={() => dispatch(setComponent('library'))}>Librarian</Nav.Link>
        <Nav.Link onClick={() => dispatch(setComponent('library-Data'))}>Library Data</Nav.Link>
        <Nav.Link onClick={() => dispatch(setComponent('fee'))}>Fees</Nav.Link>
        <Nav.Link 
          onClick={handleLogout} 
          className=" text-danger" 
          style={{"margin-top":'350px'}}
        >
          Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default SideBar;
