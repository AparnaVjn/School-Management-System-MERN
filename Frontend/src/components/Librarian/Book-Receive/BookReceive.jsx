import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { returnBook } from '../../../slices/librarianSlice';
import { fetchStudents } from '../../../slices/studentSlice';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import styles from './BookReceive.module.css';

const BookReceive = () => {
  const dispatch = useDispatch();
  const [serialNo, setSerialNo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const [bookNotIssued, setBookNotIssued] = useState(false);
  const { students } = useSelector((state) => state.students);

  const handleSerialNoChange = (e) => {
    setSerialNo(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);


  const fetchBookDetails = () => {
    const matchedStudents = students.filter((student) =>
      student.issuedBooks.some((book) => book.serialNo === serialNo)
    );

    if (matchedStudents.length > 0) {
      const student = matchedStudents[0];
      const issuedBook = student.issuedBooks.find((book) => book.serialNo === serialNo);

      if (issuedBook) {
        setBookDetails({ student, issuedBook });
        setBookNotIssued(false);
      } else {
        setBookDetails(null);
        setBookNotIssued(true);
      }
    } else {
      setBookDetails(null);
      setBookNotIssued(true);
    }
  };

  const handleReturnClick = () => {
    setShowModal(true);
  };

  const confirmReturn = () => {
    dispatch(returnBook(serialNo));
    setShowModal(false);
    setBookDetails(null);
    setBookNotIssued(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBookDetails();
  };

  return (
    <div className={styles.bookReceiveContainer}>
      <h3>Receive Book</h3>
      {/* Form to enter serial number */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="serialNo">
          <Form.Label>Enter Serial Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book's serial number"
            value={serialNo}
            onChange={handleSerialNoChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Search
        </Button>
      </Form>

      {/* Show message if book is not issued */}
      {bookNotIssued && (
        <Alert variant="warning" className="mt-3">
          The book is not issued.
        </Alert>
      )}

      {/* Display book and student details in a table if found */}
      {bookDetails && (
        <div>
          <h4>Book and Student Details</h4>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Division</th>
                  <th>Issued Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{bookDetails.student.studentName}</td>
                  <td>{bookDetails.student.className}</td>
                  <td>{bookDetails.student.division}</td>
                  <td>{new Date(bookDetails.issuedBook.issueDate).toLocaleDateString()}</td>
                  <td>
                    <Button variant="danger" onClick={handleReturnClick}>
                      Return
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Modal to confirm the return action */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Return</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to return the book?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmReturn}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default BookReceive;
