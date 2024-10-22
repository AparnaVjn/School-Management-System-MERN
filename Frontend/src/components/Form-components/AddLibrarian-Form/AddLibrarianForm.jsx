import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { addLibrarian } from '../../../slices/librarianSlice';
import styles from './AddLibrarianForm.module.css'; 

const AddLibrarianForm = () => {
  const [formData, setFormData] = useState({
    librarianName: '',
    staffId: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, librarians } = useSelector((state) => state.librarian);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.librarianName) errors.librarianName = ' Name is required';
    if (!formData.staffId) errors.staffId = 'Staff ID is required';
    if (!formData.phone) errors.phone = 'Valid phone number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setValidated(true);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(addLibrarian(formData));
      setFormData({
        librarianName: '',
        staffId: '',
        email: '',
        phone: '',
        password: '',
      });
      setValidated(false);
    }
  };

  // Show success message when the librarian is successfully added
  useEffect(() => {
    if (librarians.length > 0 && !loading && !error) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide the message after 3 seconds
      }, 3000);
    }
  }, [librarians, loading, error]);

  // Handle cancel button click - Clear form
  const handleCancel = () => {
    setFormData({
      librarianName: '',
      staffId: '',
      email: '',
      phone: '',
      password: '',
    });
  };

  return (
    <div className={styles.librarianContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Add New Librarian</h2>

        <Form validated={validated} onSubmit={handleSubmit} className={styles.form}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="librarianName"
              value={formData.librarianName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.librarianName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formStaffId">
            <Form.Label>Staff ID</Form.Label>
            <Form.Control
              type="text"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.staffId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <div className={styles.buttonGroup}>
            <Button variant="secondary" onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className={styles.submitButton}>
              Add Librarian
            </Button>
          </div>

          {Object.keys(errors).length > 0 && (
            <Alert variant="danger" className="mt-3">
              Please fix the above errors before submitting.
            </Alert>
          )}

          {/* Success Message */}
          {showSuccessMessage && (
            <Alert variant="success" className="mt-3">
              Librarian added successfully!
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
};

export default AddLibrarianForm;
