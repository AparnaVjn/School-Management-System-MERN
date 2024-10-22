import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/userSchema.js';


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Login 
export const loginUser = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;
    console.log('email,password,role:',email,password,role)

    try {
        
        const user = await User.findOne({ email });
        console.log('user data',user)
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        
        if (user.role !== role) {
            return res.status(403).json({ message: 'Unauthorized role' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid  password' });
        }

        
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('token:',token)
       
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, 
        });

        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
