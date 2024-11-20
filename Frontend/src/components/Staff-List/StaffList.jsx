import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffList, editStaffInDB, deleteStaffFromDB } from '../../slices/staffSlice';
import OfficeStaff from '../Admin/OfficeStaff-Component/OfficeStaff';
import styles from './StaffList.module.css';

function StaffList() {
  const dispatch = useDispatch();
  const { staff, loading, error } = useSelector((state) => state.staff);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    dispatch(fetchStaffList());
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
    dispatch(editStaffInDB(selectedStaff));
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteStaffFromDB(selectedStaff.staffId));
    setShowDeleteModal(false);
  };

  const handleBack = () => {
    setShowTable(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {showTable ? (
        <Container fluid className={styles.staffListContainer}>
          <div className={styles.backButton} onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} /> Back
          </div>
          <h2 className={styles.title}>Staff List</h2>

          <Table striped bordered hover responsive className={styles.table}>
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
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(staffMember)}
                      className={styles.actionButton}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(staffMember)}
                      className={styles.actionButton}
                    >
                      Delete
                    </Button>
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
                    onChange={(e) =>
                      setSelectedStaff({ ...selectedStaff, staffName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formDesignation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedStaff?.designation || ''}
                    onChange={(e) =>
                      setSelectedStaff({ ...selectedStaff, designation: e.target.value })
                    }
                  >
                    <option>Manager</option>
                    <option>Teacher</option>
                    <option>Administrator</option>
                    <option>Support Staff</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleEditSubmit}>
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete {selectedStaff?.staffName}?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      ) : (
        <OfficeStaff />
      )}
    </>
  );
}

export default StaffList;
