import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './StaffPage.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import DashBoard from '../../components/Office-Staff/DashBoard/DashBoard';
import StudentList from '../../components/Student-List/StudentList';
import MakePayment from '../../components/Office-Staff/Make-Payment/MakePayment';
import PaymentHistory from '../../components/Payment-History/PaymentHistory';
import SideBar from '../../components/Office-Staff/SideBar/SideBar';
import CommonNavbar from '../../components/Common-Navbar/CommonNavbar';
import AddStudents from '../../components/Office-Staff/AddStudents/AddStudents';
import BookList from '../../components/Librarian/Book-List/BookList';

const StaffPage = () => {
  const selectedComponent = useSelector((state) => state.staff.selectedComponent);
  const [sidebarVisible, setSidebarVisible] = useState(false); 

  const renderContent = () => {
    switch (selectedComponent) {
      case 'dashboard':
        return <DashBoard/>;
      case 'add-students':
        return <AddStudents/>;
      case 'students-list':
        return <StudentList/>;
      case 'library':
        return <BookList/>;
      case 'make-payment':
        return <MakePayment/>;
      case 'payment-history':
        return <PaymentHistory/>;
      default:
        return <DashBoard/>;
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="d-flex">      
      <div className={`${styles.menuIcon} d-lg-none`} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>
      <div
        className={`${styles.sidebar} ${sidebarVisible ? styles.show : ''} bg-light sidebar`}
        style={{ width: '250px', position: 'fixed', height: '100%', zIndex: 1 }}
      >
        <SideBar/>
      </div>

      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '250px' }}>
        <div className="fixed-top" style={{ marginLeft: '250px' }}>
          <CommonNavbar/>
        </div>

        <div className="container-fluid content-area mt-5 pt-4">
          <div className="p-3 bg-white shadow rounded">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
