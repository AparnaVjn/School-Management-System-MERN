import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, addStudentPayment } from '../../../slices/studentSlice';
import { fetchFeeTypes } from '../../../slices/feeTypesSlice';
import styles from './MakePayment.module.css'; 

const MakePayment = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { feeTypes } = useSelector((state) => state.feeTypes);

  const [formData, setFormData] = useState({
    admissionNo: '',
    studentName: '',
    className: '',
    division: '',
    feeType: '',
    amount: '',
    paymentMode: 'Cash',
  });
  const [studentNotFound, setStudentNotFound] = useState(false);
  const [feeAmount, setFeeAmount] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchFeeTypes());
  }, [dispatch]);

  const handleAdmissionNoChange = (e) => {
    const admissionNo = e.target.value;
    const student = students.find((s) => s.admissionNo === parseInt(admissionNo));
  
    if (student) {
      setFormData({
        ...formData,
        admissionNo,
        studentName: student.studentName,
        className: student.className,
        division: student.division,
      });
      setStudentNotFound(false);
    } else {
      setFormData({
        ...formData,
        admissionNo,
        studentName: '',
        className: '',
        division: '',
      });
      setStudentNotFound(true);
    }
  };
  

  const handleFeeTypeChange = (e) => {
    const selectedFeeType = e.target.value;
    const fee = feeTypes.find((f) => f.feeType === selectedFeeType);
  
    setFormData({
      ...formData,
      feeType: selectedFeeType,
      amount: fee ? fee.feeAmount : '',
    });
  
    setFeeAmount(fee ? fee.feeAmount : '');
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const { admissionNo, feeType, amount, paymentMode } = formData;
  
    if (!admissionNo || !feeType || !amount || !paymentMode) {
      alert('Please fill out all required fields.');
      return;
    }
  
    dispatch(
      addStudentPayment({
        admissionNo: formData.admissionNo,
        feeType,
        amount,
        method: paymentMode,
      })
    )
      .unwrap()
      .then(() => {
        setSuccess(true);
        clearForm();
      })
      .catch((error) => {
        console.error('Payment submission failed', error);
        alert('An error occurred while processing the payment. Please try again.');
      });
  };
  

  const clearForm = () => {
    setFormData({
      admissionNo: '',
      studentName: '',
      className: '',
      division: '',
      feeType: '',
      amount: '',
      paymentMode: 'Cash',
    });
    setFeeAmount('');
    setStudentNotFound(false);
  };

  return (
    <div className={styles.paymentFormContainer}>
      <h2 className={styles.heading}>Make a Payment</h2>

      {success && <Alert variant="success">Payment successfully added!</Alert>}

      <Form className={styles.form} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="formAdmissionNo">
              <Form.Label>Admission Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Student ID"
                value={formData.admissionNo}
                onChange={handleAdmissionNoChange}
                required
              />
              {studentNotFound && (
                <Form.Text className="text-danger">Student not found.</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="formStudentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control type="text" value={formData.studentName} readOnly />
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="formClass">
              <Form.Label>Class</Form.Label>
              <Form.Control type="text" value={formData.className} readOnly />
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="formDivision">
              <Form.Label>Division</Form.Label>
              <Form.Control type="text" value={formData.division} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formFeeType">
              <Form.Label>Fee Type</Form.Label>
              <Form.Select value={formData.feeType} onChange={handleFeeTypeChange} required>
                <option value="">Select Fee Type</option>
                {feeTypes.map((fee) => (
                  <option key={fee._id} value={fee.feeType}>
                    {fee.feeType}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" value={formData.amount || feeAmount} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formPaymentMode">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Select
                value={formData.paymentMode}
                onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                required
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online Transfer">Online Transfer</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={clearForm} className="me-2">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MakePayment;
