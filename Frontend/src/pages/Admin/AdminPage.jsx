import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DashBoard from '../../components/Admin/Admin-Dashboard/DashBoard';
import OfficeStaff from '../../components/Admin/OfficeStaff-Component/OfficeStaff';
import Student from '../../components/Admin/Student-Component/Student';
import Fees from '../../components/Admin/Fee-Component/Fees';
import SideBar from '../../components/Admin/SideBar/SideBar';
import CommonNavbar from '../../components/Common-Navbar/CommonNavbar';
import styles from './AdminPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AddLibrarianForm from '../../components/Form-components/AddLibrarian-Form/AddLibrarianForm';
import BookList from '../../components/Librarian/Book-List/BookList';

const AdminPage = () => {
  const selectedComponent = useSelector((state) => state.admin.selectedComponent);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const renderContent = () => {
    switch (selectedComponent) {
      case 'dashboard':
        return <DashBoard />;
      case 'staff':
        return <OfficeStaff />;
      case 'students':
        return <Student />;
      case 'library':
        return <AddLibrarianForm />;
      case 'library-Data':
        return <BookList />;
      case 'fee':
        return <Fees />;
      default:
        return <DashBoard />;
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="d-flex">
      <div className={`${styles.menuIcon} d-lg-none`} onClick={toggleSidebar}  style={{
          position: 'fixed',
          left: sidebarVisible ? '220px' : '15px', 
          transition: 'left 0.3s ease',
        }}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>


      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />

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

export default AdminPage;
