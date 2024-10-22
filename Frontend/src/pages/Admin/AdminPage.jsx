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
        return <AddLibrarianForm/>;
      case 'library-Data':
        return <BookList/>
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
      <div className={`${styles.menuIcon} d-lg-none`} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>      
      <div
        className={`${styles.sidebar} ${sidebarVisible ? styles.show : ''} bg-light sidebar`}
        style={{ width: '250px', position: 'fixed', height: '100%', zIndex: 1 }}
      >
        <SideBar />
      </div>

      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '250px' }}>
        <div className="fixed-top" style={{ marginLeft: '250px' }}>
          <CommonNavbar />
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

export default AdminPage;
