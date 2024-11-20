// EditStudentModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateStudent } from '../../../slices/studentSlice';

const EditStudentModal = ({ student, show, onClose }) => {
  const dispatch = useDispatch();
  const [studentName, setStudentName] = useState(student.studentName);
  const [className, setClassName] = useState(student.className);
  const [division, setDivision] = useState(student.division);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSave = () => {
    dispatch(updateStudent({ ...student, studentName, className, division }));
    onClose();
  };

  const handleSaveButtonClick = () => {
    setShowConfirmModal(true); 
  };

  return (
    <>
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Class</Form.Label>
            <Form.Control
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Division</Form.Label>
            <Form.Control
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
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
            <p>Are you sure you want to save the changes?</p>
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
};

export default EditStudentModal;
