import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, deleteStudent } from '../../slices/studentSlice';
import StudentDetailsModal from '../Modals/StudentDetails-Modal/StudentDetailsModal';
import styles from './StudentList.module.css';
import EditStudentModal from '../Modals/EditStudent-Modal/EditStudentModal';

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const studentsPerPage = 20;

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    setVisibleStudents(students.slice(0, studentsPerPage * page));
  }, [students, page]);

  const loadMoreStudents = () => setPage(page + 1);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleDeleteClick = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteConfirm(true);

  };

  const confirmDelete = () => {
    if (studentToDelete) {
      dispatch(deleteStudent(studentToDelete))
      .then(() => {
        console.log("Student data deleted successfully");
        setVisibleStudents((prevStudent) => prevStudent.filter(students => students._id !== studentToDelete));
        dispatch(fetchStudents());
        setShowDeleteConfirm(false);
      })
      .catch((error) => {
        console.error("Error deleting student data:", error);
      });
    }
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowEditModal(false);
    setSelectedStudent(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`${styles.studentListContainer} ${styles.responsiveContainer}`}>
      <h2>Student List</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Division</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleStudents.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>
                  <Button variant="link" onClick={() => handleStudentClick(student)} style={{ textDecoration: 'none' }}>
                    {student.studentName}
                  </Button>
                </td>
                <td>{student.className}</td>
                <td>{student.division}</td>
                <td>
                  {student.paymentStatus === 'Paid' && <span className="text-success">Paid</span>}
                  {student.paymentStatus === 'Partial' && <span className="text-warning">Partially Paid</span>}
                  {student.paymentStatus === 'Pending' && <span className="text-danger">Not Paid</span>}
                </td>
                <td>
                  <Button variant="warning" onClick={() => handleEditClick(student)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteClick(student._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {selectedStudent && (
        <>
          <StudentDetailsModal student={selectedStudent} show={showDetailsModal} onClose={handleCloseModal} />
          <EditStudentModal student={selectedStudent} show={showEditModal} onClose={handleCloseModal} />
        </>
      )}

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteConfirm} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the student data?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>  
    </div>
  );
};

export default StudentList;
