import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffList, editStaffInDB, deleteStaffFromDB } from '../../slices/staffSlice';

function StaffList() {
  const dispatch = useDispatch();
  const { staff, loading, error } = useSelector(state => state.staff);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    dispatch(fetchStaffList()); // Fetch staff data from the backend
  }, [dispatch]);

  const handleEditClick = (staff) => {
    setSelectedStaff(staff);
    setShowEditModal(true);
  };

  const handleDeleteClick = (staff) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = () => {
    // Call action to edit staff
    dispatch(editStaffInDB(selectedStaff));
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    // Call action to delete staff
    dispatch(deleteStaffFromDB(selectedStaff.staffId));
    setShowDeleteModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Staff List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Staff ID</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember) => (
            <tr key={staffMember.staffId}>
              <td>{staffMember.staffName}</td>
              <td>{staffMember.staffId}</td>
              <td>{staffMember.designation}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(staffMember)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteClick(staffMember)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStaffName">
              <Form.Label>Staff Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedStaff?.staffName || ''}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, staffName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                as="select"
                value={selectedStaff?.designation || ''}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, designation: e.target.value })}
              >
                <option>Manager</option>
                <option>Teacher</option>
                <option>Administrator</option>
                <option>Support Staff</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {selectedStaff?.staffName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StaffList;
