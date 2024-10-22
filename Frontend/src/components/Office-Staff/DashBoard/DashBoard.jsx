import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faBook, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../../slices/staffSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { students, staff, books, totalFeesCollected } = useSelector(state => state.staff); 
 console.log('staff in dashoard,',staff)
  
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <div className={styles.dashboardContainer}>
      <Row className="mb-4">
        {/* Total Students */}
        <Col md={6}>
          <Card className={styles.dashboardCard} style={{ backgroundColor: '#3498db' }}>
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faUserGraduate} size="3x" className={styles.icon} />
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{students}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Staff */}
        <Col md={6}>
          <Card className={styles.dashboardCard} style={{ backgroundColor: '#2ecc71' }}>
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" className={styles.icon} />
              <Card.Title>Total Staff</Card.Title>
              <Card.Text>{staff}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Books */}
        <Col md={6}>
          <Card className={styles.dashboardCard} style={{ backgroundColor: '#e67e22' }}>
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faBook} size="3x" className={styles.icon} />
              <Card.Title>Total Books</Card.Title>
              <Card.Text>{books}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Fees Collected */}
        <Col md={6}>
          <Card className={styles.dashboardCard} style={{ backgroundColor: '#e74c3c' }}>
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
