import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import styles from './Dashboard.module.css';
import { fetchDashboardData } from '../../../slices/adminSlice';

// Register required components from Chart.js
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetching data from redux store
  const { studentsCount, staffCount, booksCount, feeReceived, genderData, classData } = useSelector(
    (state) => state.admin.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Data for the Pie chart (Number of boys and girls)
  const pieData = {
    labels: ['Boys', 'Girls'],
    datasets: [
      {
        data: [genderData.boys, genderData.girls],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };
 // Pie chart options to reduce size
 const pieOptions = {
  maintainAspectRatio: false, // Allows us to adjust the size
  responsive: true,
};

  // Data for the Bar chart (Class wise total, boys, and girls)
  const barData = {
    labels: ['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    datasets: [
      {
        label: 'Total Students',
        backgroundColor: '#36A2EB',
        data: classData.total,
      },
      {
        label: 'Boys',
        backgroundColor: '#FFCE56',
        data: classData.boys,
      },
      {
        label: 'Girls',
        backgroundColor: '#FF6384',
        data: classData.girls,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Make sure the y-axis starts from zero
      },
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Cards Section */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="p-3 text-center">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{studentsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center">
            <Card.Body>
              <Card.Title>Total Staff</Card.Title>
              <Card.Text>{staffCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center">
            <Card.Body>
              <Card.Title>Total Books</Card.Title>
              <Card.Text>{booksCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center">
            <Card.Body>
              <Card.Title>Total Fee Received</Card.Title>
              <Card.Text>{feeReceived}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row>
        {/* Pie Chart for Gender Distribution */}
        <Col md={6} className={styles.chartContainer}>
          <h5>Gender Distribution</h5>
          <div style={{ height: '300px', width: '100%' }}> {/* Adjusting the chart container size */}
            <Pie data={pieData} options={pieOptions} />
          </div>
        </Col>

        {/* Bar Chart for Class-wise Data */}
        <Col md={6} className={styles.chartContainer}>
          <h5>Class-wise Student Count</h5>
          <div style={{ height: '400px', width: '100%' }}>
          <Bar data={barData}  options={barOptions}/>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
