import express from 'express';
import { loginUser } from '../controllers/authController.js';
import { check } from 'express-validator';

const router = express.Router();


router.post(
    '/login',
    [
        // Validation middleware
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        check('role', 'Role is required').not().isEmpty(),
    ],
    loginUser
);

export default router;
