import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Alert, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../../../slices/studentSlice';
import styles from './AddStudentForm.module.css';
import Student from '../../Admin/Student-Component/Student';

const AddStudentForm = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(true); 
  const [formData, setFormData] = useState({
    studentName: '',
    admissionNo: '',
    className: '',
    division: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const backendError = useSelector((state) => state.students.error); 
  console.log('backend error',backendError)
  const loading = useSelector((state) => state.students.loading); 

  const validate = () => {
    const errors = {};
    if (!formData.studentName) errors.studentName = 'Student Name is required';
    if (!formData.admissionNo || isNaN(formData.admissionNo)) errors.admissionNo = 'Valid Admission Number is required';
    if (!formData.className) errors.className = 'Class Name is required';
    if (!formData.division) errors.division = 'Division is required';
    if (!formData.gender) errors.gender = 'Gender selection is required';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setValidated(true);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(addStudent(formData)); 
    }
  };


  useEffect(() => {
    if (!loading && !backendError && validated) {
      setFormData({
        studentName: '',
        admissionNo: '',
        className: '',
        division: '',
        gender: '',
      });
      setValidated(false);
    }
  }, [loading, backendError, validated]);


  const handleBack = () => {
    setShowForm(false); 
  };

  const handleCancel = () => {
    setFormData({
      studentName: '',
      admissionNo: '',
      className: '',
      division: '',
      gender: '',
    });
  }

  return (
    <>
      {showForm ? (
        <>
         <div className={styles.backButton} onClick={handleBack}>
         <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} /> Back
       </div>
        <Form className={styles.form} validated={validated} onSubmit={handleSubmit}>
          <h3 className={styles.heading}>Add Student</h3>
          
          {/* Student Name */}
          <Row className={styles.formRow}>
            <Col>
              <Form.Group controlId="studentName">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  isInvalid={!!errors.studentName}
                  placeholder="Enter student name"
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.studentName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Admission Number */}
          <Row className={styles.formRow}>
            <Col>
              <Form.Group controlId="admissionNo">
                <Form.Label>Admission No</Form.Label>
                <Form.Control
                  type="text"
                  name="admissionNo"
                  value={formData.admissionNo}
                  onChange={handleChange}
                  isInvalid={!!errors.admissionNo}
                  placeholder="Enter admission number"
                  required
                  className={styles.noSpinner}
                />
                <Form.Control.Feedback type="invalid">{errors.admissionNo}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Class Name and Division */}
          <Row className={styles.formRow}>
            <Col>
              <Form.Group controlId="className">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  as="select"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  isInvalid={!!errors.className}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.className}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="division">
                <Form.Label>Division</Form.Label>
                <Form.Control
                  as="select"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  isInvalid={!!errors.division}
                  required
                >
                  <option value="">Select Division</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.division}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Gender */}
          <Row className={styles.formRow}>
            <Col>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit and Cancel Buttons */}
          <div className={styles.buttonGroup}>
            <Button className={styles.submitButton} onClick={handleCancel}>
              Cancel
            </Button>
            <Button className={styles.cancelButton} type="submit">
              {loading ? 'Submitting...' : 'Add'}
            </Button>
          </div>

          {/* Backend Error Alert */}
          {backendError && (
            <Alert variant="danger" className="mt-3">
              {backendError.message || 'An error occurred while adding the student.'}
            </Alert>
          )}

          {/* Frontend Validation Errors */}
          {Object.keys(errors).length > 0 && (
            <Alert variant="danger" className="mt-3">
              Please fix the above errors before submitting.
            </Alert>
          )}
        </Form>
        </>
      ) : (
        <Student />
      )}
    </>
  );
};

export default AddStudentForm;
