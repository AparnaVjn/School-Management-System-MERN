import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BookDetailsModal = ({ book, show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Book Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {book ? (
        <div>
          <p><strong>Name:</strong> {book.bookName}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <p><strong>Category:</strong> {book.category}</p>
          <p><strong>Serial Number:</strong> {book.serialNo}</p>
          <p><strong>Additional Info:</strong> {book.additionalInfo || 'N/A'}</p>
        </div>
      ) : (
        <p>No book selected.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default BookDetailsModal