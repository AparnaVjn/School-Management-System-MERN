import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './Student.module.css'; 
import AddStudentForm from '../../Form-components/AddStudent-Form/AddStudentForm';
import AddStudentCard from '../../Card-Components/Addstudent-Card/AddStudentCard';
import StudentListCard from '../../Card-Components/StudentList-Card/StudentListCard';
import StudentList from '../../Student-List/StudentList';


const Student = () => {
  const [isAddingStudent, setIsAddingStudent] = useState(false); 
  const [isViewingStudents, setIsViewingStudents] = useState(false); 


  const handleAddStudentClick = () => {
    setIsAddingStudent(true); 
    setIsViewingStudents(false); 
  };


  const handleStudentListClick = () => {
    setIsViewingStudents(true); 
    setIsAddingStudent(false); 
  };

  return (
    <Container className={`${styles.studentContainer} p-0`}>
      {isAddingStudent ? (
        <Row className="justify-content-center">
          <Col md={12} className={styles.fullWidthCol}>
            <AddStudentForm/>
          </Col>
        </Row>
      ) : isViewingStudents ? (
        <Row className="justify-content-center">
          <Col md={12} className={styles.fullWidthCol}>
            <StudentList/>
          </Col>
        </Row>
      ) : (
        // Default view showing both cards
        <Row className="justify-content-center">
          <Col md={5} className={styles.cardCol}>
            <AddStudentCard onClick={handleAddStudentClick} />
          </Col>
          <Col md={5} className={styles.cardCol}>
            <StudentListCard onClick={handleStudentListClick} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Student;
