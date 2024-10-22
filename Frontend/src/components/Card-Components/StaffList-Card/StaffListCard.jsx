import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import styles from './StaffListCard.module.css'; 

const StaffListCard = ({ onClick }) => {
  return (
    <div className={styles.cardWrapper} onClick={onClick}>
      <Card className={styles.addCard}>
        <Card.Body className="text-center">
          <FontAwesomeIcon icon={faUsers} size="3x" className={styles.icon} />
          <Card.Title className={styles.title}>Staff List</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StaffListCard;
