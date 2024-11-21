import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { fetchStudents } from '../../slices/studentSlice';
import { fetchFeeTypes } from '../../slices/feeTypesSlice';
import styles from './TotalFeeCollected.module.css'; // Import the module CSS

function TotalFeeCollected() {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const feeTypes = useSelector((state) => state.feeTypes.feeTypes);
  const loading = useSelector((state) => state.students.loading || state.feeTypes.status === 'loading');
  const error = useSelector((state) => state.students.error || state.feeTypes.error);

  useEffect(() => {
    if (students.length === 0) dispatch(fetchStudents());
    if (feeTypes.length === 0) dispatch(fetchFeeTypes());
  }, [dispatch, students.length, feeTypes.length]);

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  // Calculate total fee collected
  const totalFeeCollected = students.reduce(
    (total, student) => total + (student.amountPaid || 0),
    0
  );

  // Simulate previous month's fee collection (can be replaced with real data)
  const previousMonthFeeCollected = totalFeeCollected * 0.9; // Assume 10% less last month
  const feeIncrement = ((totalFeeCollected - previousMonthFeeCollected) / previousMonthFeeCollected) * 100;

  // Aggregate fee data per class and category
  const feeData = {};
  students.forEach((student) => {
    const className = student.className;
    if (!feeData[className]) {
      feeData[className] = {};
      feeTypes.forEach((fee) => {
        feeData[className][fee.feeType] = { collected: 0, pending: 0 };
      });
    }
    student.paymentHistory.forEach((payment) => {
      if (feeData[className][payment.feeType]) {
        feeData[className][payment.feeType].collected += payment.amount || 0;
      }
    });
    feeTypes.forEach((fee) => {
      const pendingFee = fee.feeAmount - (feeData[className][fee.feeType]?.collected || 0);
      if (feeData[className][fee.feeType]) {
        feeData[className][fee.feeType].pending = pendingFee > 0 ? pendingFee : 0;
      }
    });
  });

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col md={6}>
          <Card className={`${styles.card} shadow`}>
            <Card.Body>
              <Card.Title>Total Fee Collected</Card.Title>
              <Card.Text className={styles.totalFee}>
              ₹ {totalFeeCollected.toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className={`${styles.card} shadow`}>
            <Card.Body>
              <Card.Title>Monthly Increment</Card.Title>
              <Card.Text className={styles.increment}>
                {feeIncrement.toFixed(2)}%
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Table striped bordered hover className={`${styles.table} shadow`}>
        <thead>
          <tr>
            <th>Class</th>
            {feeTypes.map((fee) => (
              <th key={fee.feeType}>{fee.feeType} (Collected / Pending)</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(feeData).map(([className, data]) => (
            <tr key={className}>
              <td>{className}</td>
              {feeTypes.map((fee) => (
                <td key={fee.feeType}>
                  {data[fee.feeType].collected} / {data[fee.feeType].pending}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TotalFeeCollected;
