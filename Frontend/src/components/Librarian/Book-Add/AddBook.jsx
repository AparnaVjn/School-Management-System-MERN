import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addBook } from '../../../slices/librarianSlice'; 
import styles from './AddBook.module.css'; 

const AddBook = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    bookName: '',
    author: '',
    language: '',
    category: '',
    serialNo: '',
  });
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Dispatch the action to add the book
      console.log('book data:',formData)
      dispatch(addBook(formData))
        .unwrap()
        .then(() => {
          setSuccess(true); // Show success message
          clearForm(); // Reset form after successful submission
        })
        .catch((error) => console.error('Failed to add book', error));
    }

    setValidated(true);
  };

  const clearForm = () => {
    setFormData({
      bookName: '',
      author: '',
      language: '',
      category: '',
      serialNo: '',
    });
    setValidated(false);
  };

  return (
    <div className={styles.addBookContainer}>
      <h2>Add New Book</h2>

      {success && <Alert variant="success">Book successfully added!</Alert>}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBookName">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book name"
              name="bookName"
              value={formData.bookName}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide the book name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide the author's name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a language.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a category.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="SerialNo">
            <Form.Label>Serial Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter serial number"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide the serial number.
            </Form.Control.Feedback>
          </Form.Group>
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

export default AddBook;
