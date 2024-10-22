import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './AddStudentCard.module.css'; 

const AddStudentCard = ({ onClick }) => {  // Receiving the onClick as prop
  return (
    <div className={styles.cardWrapper} onClick={onClick}>  {/* onClick event on div */}
      <Card className={styles.addCard}>
        <Card.Body className="text-center">
          <FontAwesomeIcon icon={faPlus} size="3x" className={styles.icon} />
          <Card.Title className={styles.title}>Add a Student</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddStudentCard;
