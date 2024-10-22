import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import styles from './LandingPage.module.css'; 
import icon from '../../assets/schoolLogo.png'; 
import LoginModal from '../../components/Modals/Login-Modal/LoginModal';

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);

    
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    return (
        <div className={styles.landingPage}>
            <div className={styles.overlay}>
                <Container fluid className={styles.contentWrapper}>
                    <div className={styles.schoolName}>
                        <h1>ABC PUBLIC SCHOOL</h1>
                    </div>
                    <div className={styles.schoolIcon}>
                        <img src={icon} alt="School Logo" />
                    </div>
                    <div className={styles.loginButton}>
                        <Button variant="light" size="lg" onClick={handleShow}>
                            Login
                        </Button>
                    </div>
                </Container>
            </div>
            <LoginModal show={showModal} handleClose={handleClose} />
        </div>
    );
};

export default LandingPage;
