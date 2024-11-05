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
    <div className={`${styles.studentListContainer} ${styles.responsiveContainer}`}>
      <div>
        <h2>Student List</h2>
      </div>
      
      <div className="table-responsive"> 
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SL No.</th> 
              <th>Student Name</th>
              <th>Class</th>
              <th>Division</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleStudents.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td> 
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleStudentClick(student)}
                    style={{ textDecoration: 'none' }}
                  >
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
