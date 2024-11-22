import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { fetchStudents } from '../../slices/studentSlice';
import { fetchFeeTypes } from '../../slices/feeTypesSlice';
import styles from './TotalFeeCollected.module.css';

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

  // Simulate previous month's fee collection
  const previousMonthFeeCollected = totalFeeCollected * 0.9;
  const feeIncrement = ((totalFeeCollected - previousMonthFeeCollected) / previousMonthFeeCollected) * 100;

  // Aggregate fee data by class and feeType
  const feeData = {};
  students.forEach((student) => {
    const className = student.className;

    // Initialize class entry if not already present
    if (!feeData[className]) {
      feeData[className] = {};
    }

    // Process each fee type
    feeTypes.forEach((feeType) => {
      const { feeType: type, feeAmount } = feeType;

      // Initialize fee type entry for the class
      if (!feeData[className][type]) {
        feeData[className][type] = { collected: 0, pending: 0 };
      }

      // Calculate total collected for this fee type
      const collectedAmount = student.paymentHistory
        .filter((payment) => payment.feeType === type)
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);

  // Determine pending amount based on student's totalFees or feeAmount
  const totalForType = feeAmount || student.totalFees;

  // Update collected and pending amounts
  feeData[className][type].collected += collectedAmount;
  feeData[className][type].pending += Math.max(totalForType - collectedAmount, 0);

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

            {/* Accordion for Class-wise Fee Details */}
            <Accordion>
        {Object.entries(feeData).map(([className, classFees], index) => (
          <Accordion.Item eventKey={index} key={className}>
            <Accordion.Header>{className}</Accordion.Header>
            <Accordion.Body>
              {Object.entries(classFees).map(([feeType, data]) => (
                <div key={feeType} className="mb-2">
                  <strong>{feeType}:</strong>
                  <span className="text-success"> Collected: ₹{data.collected}</span> /
                  <span className="text-danger"> Pending: ₹{data.pending}</span>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default TotalFeeCollected;
