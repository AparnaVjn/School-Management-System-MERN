import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editBook } from '../../../slices/librarianSlice'; 

function EditBookModal({ book, show, onClose }) {
  const dispatch = useDispatch(); 
  const [bookName, setBookName] = useState(book.bookName);
  const [author, setAuthor] = useState(book.author);
  const [language, setLanguage] = useState(book.language);
  const [category, setCategory] = useState(book.category);
  const [serialNo, setSerialNo] = useState(book.serialNo);


  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSave = () => {
    const updatedBook = { bookName, author, language, category, serialNo }; 


    dispatch(editBook({ id: book._id, updatedData: updatedBook }))
      .then(() => {
        console.log("Book updated successfully");
        onClose(); 
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };


  const handleSaveButtonClick = () => {
    setShowConfirmModal(true); 
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBookName">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLanguage">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSerialNo">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                type="text"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveButtonClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to save the changes to this book?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            handleSave(); 
            setShowConfirmModal(false); 
          }}>
            Yes, Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBookModal;
