import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../../slices/librarianSlice';
import { fetchStudents } from '../../../slices/studentSlice';
import { fetchDashboardData } from '../../../slices/staffSlice';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faBook, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { books, loading: loadingBooks, error: errorBooks } = useSelector((state) => state.librarian);
  const { students, loading: loadingStudents, error: errorStudents } = useSelector((state) => state.students);
  const { totalFeesCollected } = useSelector(state => state.staff); 

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchStudents());
    dispatch(fetchDashboardData());
  }, [dispatch]);


  if (loadingBooks || loadingStudents) {
    return (
      <div className={styles.loading}>
        <Spinner animation="border" />
        <span>Loading...</span>
      </div>
    );
  }

  if (errorBooks || errorStudents) {
    return <p>Error fetching data: {errorBooks || errorStudents}</p>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Row className="mb-4">
      <Col md={6}>
          <Card className={styles.dashboardCard}  style={{ backgroundColor: '#3498db' }}>
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faBook} size="3x" className={styles.icon} />
              <Card.Title>Total Books</Card.Title>
              <Card.Text>{books.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col> 

        <Col md={6}>
          <Card className={styles.dashboardCard}  style={{ backgroundColor: '#e67e22' }}>
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faBook} size="3x" className={styles.icon} />
              <Card.Title>Books Available</Card.Title>
              <Card.Text>{books.filter(book => book.isAvailable).length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className={styles.dashboardCard}  style={{ backgroundColor: '#2ecc71' }}>
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faUserGraduate} size="3x" className={styles.icon} />
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{students.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>  

        <Col md={6}>
          <Card className={styles.dashboardCard}  style={{ backgroundColor: '#e74c3c' }}>
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faDollarSign} size="3x" className={styles.icon} />
              <Card.Title>Total Fees Collected</Card.Title>
              <Card.Text>{`₹${totalFeesCollected}`}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
