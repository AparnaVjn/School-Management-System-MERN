import express from 'express';
import { addStudent, getStudents, addStudentPayment, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

// Route to add a student
router.post('/addstudents', addStudent);

// Route to fetch all students
router.get('/students', getStudents);

// Route to add student payment
router.post('/students/addPayment/:admissionNo', addStudentPayment);

router.put('/students/:id', updateStudent);

router.delete('/students/:id', deleteStudent);

export default router;
