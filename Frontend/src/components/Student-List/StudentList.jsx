import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../slices/studentSlice';
import StudentDetailsModal from '../Modals/StudentDetails-Modal/StudentDetailsModal';
import styles from './StudentList.module.css';



const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [visibleStudents, setVisibleStudents] = useState([]); 
  const [page, setPage] = useState(1); 
  const [showModal, setShowModal] = useState(false);

  const studentsPerPage = 20;

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    console.log('students:',students)  
    if (students.length > 0) {
      setVisibleStudents(students.slice(0, studentsPerPage));
    }
  }, [students]);

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreStudents();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleStudents, students]);

  const loadMoreStudents = () => {
    const newPage = page + 1;
    const newStudents = students.slice(0, studentsPerPage * newPage);
    setVisibleStudents(newStudents);
    setPage(newPage);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedStudent(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div  className={styles.studentListContainer}>
      <div>
      <h2>Student List</h2>
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL No.</th> {/* Serial number column */}
            <th>Student Name</th>
            <th>Class</th>
            <th>Division</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {visibleStudents.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td> {/* Serial number (1-based index) */}
              <td>
                <Button
                  variant="link"
                  onClick={() => handleStudentClick(student)}
                  style={{ textDecoration: 'none' }} // Removes underline
                >
                  {student.studentName}
                </Button>
              </td>
              <td>{student.className}</td>
              <td>{student.division}</td>
              <td>
                {student.paymentStatus === 'paid' && <span className="text-success">Paid</span>}
                {student.paymentStatus === 'partially paid' && <span className="text-warning">Partially Paid</span>}
                {student.paymentStatus === 'not paid' && <span className="text-danger">Not Paid</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Show student details in a modal */}
      {selectedStudent && (
        <StudentDetailsModal
        student={selectedStudent}
        show={showModal}
        onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default StudentList;
