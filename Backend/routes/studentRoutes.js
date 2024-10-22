import express from 'express';
import { addStudent, getStudents, addStudentPayment } from '../controllers/studentController.js';

const router = express.Router();

// Route to add a student
router.post('/addstudents', addStudent);

// Route to fetch all students
router.get('/students', getStudents);

// Route to add student payment
router.post('/students/addPayment/:admissionNo', addStudentPayment);

export default router;
