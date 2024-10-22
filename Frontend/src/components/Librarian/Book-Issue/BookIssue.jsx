import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../../slices/studentSlice";
import { fetchBooks, issueBookToStudent } from "../../../slices/librarianSlice";
import { Button, Form, Modal, Alert, Table } from "react-bootstrap";
import styles from './BookIssue.module.css'

const BookIssue = () => {
  const [studentId, setStudentId] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [bookName, setBookName] = useState(""); 
  const [hasSearched, setHasSearched] = useState(false);  // New state to track search

  const dispatch = useDispatch();
  const { students, loading: studentLoading, error: studentError } = useSelector((state) => state.students);
  const { books, error: bookError } = useSelector((state) => state.librarian);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleStudentSearch = () => {
    const foundStudent = students.find((student) => student.admissionNo === parseInt(studentId));
    if (foundStudent) {
      setSelectedStudent(foundStudent);
    } else {
      setSelectedStudent(null);
    }
    setHasSearched(true);  // Set hasSearched to true after attempting a search
  };

  const handleSerialNoChange = (e) => {
    const enteredSerialNo = e.target.value;
    setSerialNo(enteredSerialNo);

    // Find the book using the serial number
    const foundBook = books.find((book) => book.serialNo === enteredSerialNo);
    if (foundBook) {
      setBookName(foundBook.bookName); // Automatically set the book name based on serial number
    } else {
      setBookName(""); // Clear the book name if not found
    }
  };

  const handleIssueBook = () => {
    if (bookName) {
      // Dispatch the action to issue the book
      dispatch(issueBookToStudent({ admissionNo: studentId, serialNo, bookName }))
        .then(() => {
          // After the book is issued successfully, update the selectedStudent's issuedBooks
          const newIssuedBook = {
            serialNo,
            bookName,
            issueDate: new Date().toISOString(), // Use current date as issue date
          };
  
          // Update the selectedStudent's issuedBooks without mutating the original object
          setSelectedStudent({
            ...selectedStudent,
            issuedBooks: [...selectedStudent.issuedBooks, newIssuedBook],
          });
  
          // Close the modal
          setShowModal(false);
  
          // Optionally, reset serialNo and bookName after issuing
          setSerialNo("");
          setBookName("");
        });
    }
  };

  return (
    <div className={`${styles.bookIssueContainer} container `}>
      <h2>Issue Book to Student</h2>

      {/* Student ID Input */}
      <Form.Group controlId="studentId">
        <Form.Label>Enter Student ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter student admission number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={handleStudentSearch}>
          Search Student
        </Button>
      </Form.Group>

      {/* Student Details */}
      {selectedStudent && (
        <>
          <h4 className="mt-4">Student Details</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Division</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedStudent.studentName}</td>
                <td>{selectedStudent.className}</td>
                <td>{selectedStudent.division}</td>
              </tr>
            </tbody>
          </Table>

          {/* Library History */}
          <h5 className="mt-4">Library History</h5>
          {selectedStudent.issuedBooks.length ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SL No</th>
                  <th>Book Name</th>
                  <th>Issue Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.issuedBooks.map((book, index) => (
                  <tr key={index}>
                    <td>{book.serialNo}</td>
                    <td>{book.bookName}</td>
                    <td>{new Date(book.issueDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No books issued yet.</p>
          )}

          {/* Book Serial No Input */}
          <Form.Group controlId="serialNo" className="mt-4">
            <Form.Label>Enter Book Serial Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book serial number"
              value={serialNo}
              onChange={handleSerialNoChange} // Use the custom handler to find the book name
            />
          </Form.Group>

          {/* Automatically display the book name */}
          {bookName && (
            <div className="mt-3">
              <h5>Book Name: {bookName}</h5>
            </div>
          )}

          {/* Confirm Button */}
          <Button variant="success" className="mt-3" onClick={() => setShowModal(true)} disabled={!bookName}>
            Confirm Issue
          </Button>
        </>
      )}

      {/* Error Messages */}
      {studentError && <Alert variant="danger">{studentError}</Alert>}
      {hasSearched && !selectedStudent && studentId && (
        <Alert variant="warning">Student not found</Alert>
      )}
      {bookError && <Alert variant="danger">{bookError}</Alert>}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Book Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to issue the book with serial no. {serialNo} ("{bookName}") to {selectedStudent?.studentName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleIssueBook}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookIssue;
