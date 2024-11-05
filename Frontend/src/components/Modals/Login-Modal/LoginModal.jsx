import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../slices/authSlice'; 
import { useNavigate } from 'react-router-dom'; 
import styles from './LoginModal.module.css';

const LoginModal = ({ show, handleClose }) => {
    const [role, setRole] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        const credentials = { email, password, role };
        dispatch(loginUser(credentials));
    };

    
    useEffect(() => {
        if (isAuthenticated && user) {
            const role = user.role;
            if (role === 'Admin') {
                navigate('/adminpage');
            } else if (role === 'Office Staff') {
                navigate('/staffpage');
            } else if (role === 'Librarian') {
                navigate('/librarianpage');
            } else {
                navigate('/'); 
            }
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className={styles.customModal}>
            <Modal.Body className={styles.modalBody}>
                <Container fluid className={styles.modalContentWrapper}>
                    {/* Left Section */}
                    <div className={styles.leftSection}>
                        <h2>Select your Role</h2>
                        <Form>
                            <Form.Check
                                type="radio"
                                label="Admin"
                                name="role"
                                value="Admin"
                                checked={role === 'Admin'}
                                onChange={() => setRole('Admin')}
                            />
                            <Form.Check
                                type="radio"
                                label="Office Staff"
                                name="role"
                                value="Office Staff"
                                checked={role === 'Office Staff'}
                                onChange={() => setRole('Office Staff')}
                            />
                            <Form.Check
                                type="radio"
                                label="Librarian"
                                name="role"
                                value="Librarian"
                                checked={role === 'Librarian'}
                                onChange={() => setRole('Librarian')}
                            />
                        </Form>
                    </div>

                    {/* Right Section - Login Form */}
                    <div className={styles.rightSection}>
                        <h2>Sign into your account</h2>
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                            <Button type="submit" className={`mt-4 ${styles.customButton}`} disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Form>
                    </div>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
