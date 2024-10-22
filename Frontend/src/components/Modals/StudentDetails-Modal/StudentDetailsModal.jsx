import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StudentDetailsModal = ({ student, show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {student ? (
          <div>
            <p><strong>Name:</strong> {student.studentName}</p>
            <p><strong>Class:</strong> {student.className}</p>
            <p><strong>Division:</strong> {student.division}</p>
            <p><strong>Payment Status:</strong> {student.paymentStatus}</p>
            <p><strong>Additional Info:</strong> {student.additionalInfo || 'N/A'}</p>
          </div>
        ) : (
          <p>No student selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentDetailsModal;
