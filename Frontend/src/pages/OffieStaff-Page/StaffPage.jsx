import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './StaffPage.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import DashBoard from '../../components/Office-Staff/DashBoard/DashBoard';
// import StudentList from '../../components/Student-List/StudentList';
import MakePayment from '../../components/Office-Staff/Make-Payment/MakePayment';
import PaymentHistory from '../../components/Payment-History/PaymentHistory';
import SideBar from '../../components/Office-Staff/SideBar/SideBar';
import CommonNavbar from '../../components/Common-Navbar/CommonNavbar';
import AddStudents from '../../components/Office-Staff/AddStudents/AddStudents';
import BookList from '../../components/Librarian/Book-List/BookList';
import StudentList from '../../components/Office-Staff/Students-List/StudentsList';

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
      <div className={`${styles.menuIcon} d-lg-none`} onClick={toggleSidebar} style={{
          position: 'fixed',
          left: sidebarVisible ? '220px' : '15px', 
          transition: 'left 0.3s ease',
        }}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>

        <SideBar  sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar}/>
  

      <div
        className={`${styles.mainContent} flex-grow-1 d-flex flex-column`}
        style={{
          transition: 'margin 0.3s ease-in-out',
          width: sidebarVisible ? 'calc(100% - 250px)' : '100%',
          overflowX: 'hidden',
        }}
      >
        
        <CommonNavbar /> 

        <div className="container-fluid content-area" 
        style={{
          marginTop: '70px'
        }}>
          <div className="p-3 bg-white shadow rounded">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
