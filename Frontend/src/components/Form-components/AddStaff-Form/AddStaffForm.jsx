import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Alert, Row } from 'react-bootstrap';
import { addStaffToDB } from '../../../slices/staffSlice';
import styles from './AddStaffForm.module.css';
import OfficeStaff from '../../Admin/OfficeStaff-Component/OfficeStaff';

const AddStaffForm = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(true); 
  const [formData, setFormData] = useState({
    staffName: '',
    designation: '',
    staffId: '',
    phoneNumber: '',
    email: '',
    password: '', 
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // Add this

  const validate = () => {
    const errors = {};
    if (!formData.staffName) errors.staffName = 'Staff Name is required';
    if (!formData.designation) errors.designation = 'Designation is required';
    if (!formData.staffId) errors.staffId = 'Staff ID is required';
    if (!formData.phoneNumber) errors.phoneNumber = 'Valid phone number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setValidated(true);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await dispatch(addStaffToDB(formData)).unwrap(); 
        setSubmissionStatus('success'); 
      } catch (error) {
        setSubmissionStatus('error'); 
      }

      
      setFormData({
        staffName: '',
        designation: '',
        staffId: '',
        phoneNumber: '',
        email: '',
        password: '', 
      });
      setValidated(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false); 
  };

  return (
    <>
      {showForm ? (
        <>
          <Form className={styles.form} validated={validated} onSubmit={handleSubmit}>
            <h3 className={styles.heading}>Add Staff</h3>
            
            <Row className={styles.formRow}>
              <Col>
                <Form.Group controlId="staffName">
                  <Form.Label>Staff Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="staffName"
                    value={formData.staffName}
                    onChange={handleChange}
                    isInvalid={!!errors.staffName}
                    placeholder="Enter staff name"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.staffName}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className={styles.formRow}>
              <Col>
                <Form.Group controlId="designation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    as="select"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    isInvalid={!!errors.designation}
                    required
                  >
                    <option value="">Select designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Support Staff">Support Staff</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.designation}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className={styles.formRow}>
              <Col>
                <Form.Group controlId="staffId">
                  <Form.Label>Staff ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="staffId"
                    value={formData.staffId}
                    onChange={handleChange}
                    isInvalid={!!errors.staffId}
                    placeholder="Enter staff ID"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.staffId}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className={styles.formRow}>
              <Col>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.phoneNumber}
                    placeholder="Enter phone number"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className={styles.formRow}>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className={styles.formRow}>
              <Col>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className={styles.buttonGroup}>
              <Button className={styles.submitButton} onClick={handleCancel}>
                Cancel
              </Button>
              <Button className={styles.cancelButton} type="submit">
                Add
              </Button>
            </div>

            {Object.keys(errors).length > 0 && (
              <Alert variant="danger" className="mt-3">
                Please fix the above errors before submitting.
              </Alert>
            )}
          </Form>

          {/* Show success or error message */}
          {submissionStatus === 'success' && (
            <Alert variant="success" className="mt-3">
              Staff added successfully!
            </Alert>
          )}
          {submissionStatus === 'error' && (
            <Alert variant="danger" className="mt-3">
              There was an error adding the staff. Please try again.
            </Alert>
          )}
        </>
      ) : (
        <OfficeStaff />
      )}
    </>
  );
};

export default AddStaffForm;
