import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../../slices/librarianSlice';
import { fetchStudents } from '../../../slices/studentSlice';
import { fetchDashboardData } from '../../../slices/staffSlice';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
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
      <h2 className="mb-4">Dashboard</h2>
      <Row xs={1} md={2} lg={2} className="g-5">
        <Col >
          <Card className={styles.card}  style={{ backgroundColor: '#3498db' }}>
            <Card.Body>
              <Card.Title>Total Books</Card.Title>
              <Card.Text>{books.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>       
        <Col >
          <Card className={styles.card}  style={{ backgroundColor: '#e67e22' }}>
            <Card.Body>
              <Card.Title>Books Available</Card.Title>
              <Card.Text>{books.filter(book => book.isAvailable).length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col >
          <Card className={styles.card}  style={{ backgroundColor: '#2ecc71' }}>
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{students.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>    
        <Col >
          <Card className={styles.card}  style={{ backgroundColor: '#e74c3c' }}>
            <Card.Body>
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
