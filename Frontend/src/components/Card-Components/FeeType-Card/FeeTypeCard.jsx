import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'; // Use appropriate fee-related icon
import styles from './FeeTypeCard.module.css';

const FeeTypeCard = ({ onClick }) => {  
  return (
    <div className={styles.cardWrapper} onClick={onClick}> 
      <Card className={styles.feeCard}>
        <Card.Body className="text-center">
          <FontAwesomeIcon icon={faMoneyCheckAlt} size="3x" className={styles.icon} />
          <Card.Title className={styles.title}>Fee Type</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FeeTypeCard;
