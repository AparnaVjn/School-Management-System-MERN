import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './LibrarianPage.module.css'; 
import DashBoard from '../../components/Librarian/DashBoard/DashBoard';
import AddBook from '../../components/Librarian/Book-Add/AddBook';
import BookList from '../../components/Librarian/Book-List/BookList';
import BookIssue from '../../components/Librarian/Book-Issue/BookIssue';
import BookReceive from '../../components/Librarian/Book-Receive/BookReceive';
import SideBar from '../../components/Librarian/SideBar/SideBar';
import CommonNavbar from '../../components/Common-Navbar/CommonNavbar';


function LibrarianPage() {
    const selectedComponent = useSelector((state) => state.librarian.selectedComponent);
    const [sidebarVisible, setSidebarVisible] = useState(false); 

    const renderContent = () => {
        switch (selectedComponent) {
          case 'dashboard':
            return <DashBoard/>;
          case 'add-books':
            return <AddBook/>;
          case 'book-list':
            return <BookList/>;
          case 'book-issue':
            return <BookIssue/>;
          case 'book-return':
            return <BookReceive/>;
          default:
            return <DashBoard/>;
        }
      };

      const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      }

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
  )
}

export default LibrarianPage;