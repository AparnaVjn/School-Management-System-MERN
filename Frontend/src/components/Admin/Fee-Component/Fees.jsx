import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faMoneyCheckAlt, faHourglassHalf, faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from './Fees.module.css';
import FeeTypes from '../FeeTypes/FeeTypes';
import TotalFeeCollected from '../../Collected-Fee/TotalFeeCollected';
import PendingFee from '../../Pending-Fess/PendingFee';
import PaymentHistory from '../../Payment-History/PaymentHistory';

const Fees = () => {
  const [activeCard, setActiveCard] = useState('feeTypes');

  const renderContent = () => {
    switch (activeCard) {
      case 'feeTypes':
        return <FeeTypes/>;
      case 'totalFeeCollected':
        return <TotalFeeCollected/>;
      case 'pendingFee':
        return <PendingFee/>;
      case 'paymentHistory':
        return <PaymentHistory/>;
      default:
        return <FeeTypes />;
    }
  };

  return (
    <div className={styles.container}>
      <Row className="mb-4">
        <Col md={3}>
          <Card
            onClick={() => setActiveCard('feeTypes')}
            className={`${styles.card} ${activeCard === 'feeTypes' && styles.activeCard}`}
            style={{ backgroundColor: '#f39c12' }}
          >
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faFileInvoiceDollar} size="2x" />
              <Card.Title>Fee Types</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            onClick={() => setActiveCard('totalFeeCollected')}
            className={`${styles.card} ${activeCard === 'totalFeeCollected' && styles.activeCard}`}
            style={{ backgroundColor: '#27ae60' }}
          >
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
              <Card.Title>Total Fee Collected</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            onClick={() => setActiveCard('pendingFee')}
            className={`${styles.card} ${activeCard === 'pendingFee' && styles.activeCard}`}
            style={{ backgroundColor: '#e74c3c' }}
          >
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faHourglassHalf} size="2x" />
              <Card.Title>Pending Fee</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            onClick={() => setActiveCard('paymentHistory')}
            className={`${styles.card} ${activeCard === 'paymentHistory' && styles.activeCard}`}
            style={{ backgroundColor: '#3498db' }}
          >
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faHistory} size="2x" />
              <Card.Title>Payment History</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Fees;
