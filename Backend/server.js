import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/login-route.js';
import dashboardRoutes from './routes/dashboard-route.js'; 
import staffRoute from './routes/staffRoutes.js';
import studentRoute from './routes/studentRoutes.js';
import feeTypesRoute from './routes/feeRoutes.js';
import libraryRoute from './routes/library-route.js';
import createUser from './createUser.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS 
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

// Routes
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes); 
app.use('/api', staffRoute);
app.use('/api',studentRoute);
app.use('/api/fees',feeTypesRoute);
app.use('/api',libraryRoute);

//createUser()

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
