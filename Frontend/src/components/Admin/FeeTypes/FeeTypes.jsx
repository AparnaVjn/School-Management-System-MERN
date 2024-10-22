import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeeTypes, addFeeType, deleteFeeType, updateFeeType } from '../../../slices/feeTypesSlice';
import styles from './FeeTypes.module.css';

const FeeTypes = () => {
  const dispatch = useDispatch();
  const feeTypes = useSelector((state) => state.feeTypes.feeTypes);
  const [feeType, setFeeType] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [className, setClassName] = useState('5');
  const [editingFeeId, setEditingFeeId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null); // Tracks whether it's delete or edit
  const [currentFee, setCurrentFee] = useState(null); // Tracks the fee currently being acted on

  // Fetch fee types when component mounts
  useEffect(() => {
    dispatch(fetchFeeTypes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingFeeId) {
      // Show modal for confirmation when editing
      setModalAction('edit');
      setShowModal(true);
    } else {
      dispatch(addFeeType({ id: Date.now(), feeType, feeAmount, className }));
      resetForm();
    }
  };

  const handleEdit = (fee) => {
    // Pre-fill the form fields with selected fee's data for editing
    setFeeType(fee.feeType);
    setFeeAmount(fee.feeAmount);
    setClassName(fee.classSelected);
    setEditingFeeId(fee._id); // Store the id of the fee being edited
  };

  const handleCancel = () => {
    // Reset form fields and exit edit mode
    resetForm();
  };

  const handleDelete = (fee) => {
    // Show modal for confirmation before deleting
    setCurrentFee(fee);
    setModalAction('delete');
    setShowModal(true);
  };

  const confirmAction = () => {
    if (modalAction === 'edit') {
      // Dispatch update action if confirmed
      dispatch(updateFeeType({ id: editingFeeId, feeType, feeAmount, className }));
      resetForm();
    } else if (modalAction === 'delete') {
      // Dispatch delete action if confirmed
      dispatch(deleteFeeType(currentFee._id));
    }
    setShowModal(false); // Close modal after confirmation
  };

  const resetForm = () => {
    setFeeType('');
    setFeeAmount('');
    setClassName('5');
    setEditingFeeId(null);
  };

  return (
    <div className={styles.feeTypesContainer}>
      <Form onSubmit={handleSubmit} className={styles.feeForm}>
        <Form.Group controlId="feeType">
          <Form.Label>Fee Type</Form.Label>
          <Form.Control
            type="text"
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="feeAmount">
              <Form.Label>Fee Amount</Form.Label>
              <Form.Control
                type="number"
                value={feeAmount}
                onChange={(e) => setFeeAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="className">
              <Form.Label>Class</Form.Label>
              <Form.Control
                as="select"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              >
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <div>
          <Button variant="primary" type="submit" className={styles.submitBtn}>
            {editingFeeId ? 'Update Fee Type' : 'Add Fee Type'}
          </Button>
          {editingFeeId && (
            <Button variant="secondary" onClick={handleCancel} className={styles.cancelBtn}>
              Cancel
            </Button>
          )}
        </div>
      </Form>

      <Table striped bordered hover className={styles.feeTable}>
        <thead>
          <tr>
            <th>Fee Type</th>
            <th>Fee Amount</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feeTypes.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.feeType}</td>
              <td>{fee.feeAmount}</td>
              <td>{fee.className}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(fee)} className={styles.editBtn}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(fee)} className={styles.deleteBtn}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm {modalAction === 'delete' ? 'Deletion' : 'Edit'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === 'delete'
            ? 'Are you sure you want to delete this fee type?'
            : 'Are you sure you want to update this fee type?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeeTypes;
