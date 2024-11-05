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
        return <DashBoard />;
      case 'add-books':
        return <AddBook />;
      case 'book-list':
        return <BookList />;
      case 'book-issue':
        return <BookIssue />;
      case 'book-return':
        return <BookReceive />;
      default:
        return <DashBoard />;
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <div className="d-flex">
      <div className={`${styles.menuIcon} d-lg-none`} onClick={toggleSidebar} style={{
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
  )
}

export default LibrarianPage;