import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './OfficeStaff.module.css'; 
import AddStaffCard from '../../Card-Components/AddStaff-Card/AddStaffCard';
import StaffListCard from '../../Card-Components/StaffList-Card/StaffListCard';
import AddStaffForm from '../../Form-components/AddStaff-Form/AddStaffForm';
import StaffList from '../../Staff-List/StaffList';


const OfficeStaff = () => {
  const [isAddingStaff, setIsAddingStaff] = useState(false); 
  const [isViewingStaff, setIsViewingStaff] = useState(false); 

  // Function to handle when the AddStaffCard is clicked
  const handleAddStaffClick = () => {
    setIsAddingStaff(true); 
    setIsViewingStaff(false); 
  };

  // Function to handle when the StaffListCard is clicked
  const handleStaffListClick = () => {
    setIsViewingStaff(true); 
    setIsAddingStaff(false); 
  };

  return (
    <Container className={styles.staffContainer}>
      {isAddingStaff ? (
        <Row className="justify-content-center">
          <Col md={12} className={styles.fullWidthCol}>
            <AddStaffForm/>
          </Col>
        </Row>
      ) : isViewingStaff ? (
        <Row className="justify-content-center">
          <Col md={12} className={styles.fullWidthCol}>
            <StaffList/>
          </Col>
        </Row>
      ) : (
        // Default view showing both cards
        <Row className="justify-content-center">
          <Col md={5} className={styles.cardCol}>
              <AddStaffCard onClick={handleAddStaffClick}/>
          </Col>
          <Col md={5} className={styles.cardCol}>
            <StaffListCard onClick={handleStaffListClick} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OfficeStaff;
