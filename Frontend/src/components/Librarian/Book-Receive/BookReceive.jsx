import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { returnBook } from '../../../slices/librarianSlice'; 
import { fetchStudents } from '../../../slices/studentSlice'; 
import { Table, Button, Modal, Form } from 'react-bootstrap';
import styles from './BookReceive.module.css';

const BookReceive = () => {
  const dispatch = useDispatch();
  const [serialNo, setSerialNo] = useState(''); // Track serial number input
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [bookDetails, setBookDetails] = useState(null); // Store fetched book and student details

  const { students } = useSelector((state) => state.students); // Get students from Redux store
  console.log('student array:',students)

  // Handle serial number input change
  const handleSerialNoChange = (e) => {
    setSerialNo(e.target.value);
  };

  console.log('serial no.',serialNo)

  // Fetch all students on component mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Fetch book details based on serial number
  const fetchBookDetails = () => {
    // Find the student who has the book issued
    const matchedStudents = students.filter((student) => 
      student.issuedBooks.some((book) => book.serialNo === serialNo)
    );
  
    if (matchedStudents.length > 0) {
      // If the student is found, get the first matched student
      const student = matchedStudents[0];
      
      // Find the specific book in the student's issuedBooks list
      const issuedBook = student.issuedBooks.find((book) => book.serialNo === serialNo);
  
      // Set the details if both student and issued book are found
      if (issuedBook) {
        setBookDetails({ student, issuedBook });
      } else {
        setBookDetails(null);
      }
    } else {
      // If no matching student is found, clear the details
      setBookDetails(null);
    }
  };
  console.log('book details',bookDetails)

  // Show return confirmation modal
  const handleReturnClick = () => {
    setShowModal(true);
  };

  // Confirm the return action and dispatch returnBook action
  const confirmReturn = () => {
    dispatch(returnBook(serialNo)); 
    setShowModal(false);
    setBookDetails(null); 
  };

  // Handle form submission to fetch book details
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default submission
    fetchBookDetails(); // Fetch book details based on serial number
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

      {/* Display book and student details in a table if found */}
      {bookDetails && (
        <div>
          <h4>Book and Student Details</h4>
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
