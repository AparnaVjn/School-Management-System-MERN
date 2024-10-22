import React from 'react'
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../slices/librarianSlice'; 
import { logout } from '../../../slices/authSlice'; 
import { useNavigate } from 'react-router-dom'; 

function SideBar() {
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
          <Nav.Link onClick={() => dispatch(setComponent('add-books'))}>Add Books</Nav.Link>
          <Nav.Link onClick={() => dispatch(setComponent('book-list'))}>Book List</Nav.Link>
          <Nav.Link onClick={() => dispatch(setComponent('book-issue'))}>Issue Book</Nav.Link>
          <Nav.Link onClick={() => dispatch(setComponent('book-return'))}>Receive Book</Nav.Link>
          <Nav.Link 
            onClick={handleLogout} 
            className="text-danger"
            style={{"margin-top":'400px'}}
          >
            Logout
          </Nav.Link>
        </Nav>
    </div>
  )
}

export default SideBar