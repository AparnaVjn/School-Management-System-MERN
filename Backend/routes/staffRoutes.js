import express from 'express';
import { addStaff, getAllStaff, editStaff, deleteStaff, fetchDashboardData } from '../controllers/staffController.js';

const router = express.Router();

router.post('/addstaff', addStaff);
router.get('/staff', getAllStaff);           
router.put('/staff/:staffId', editStaff);    
router.delete('/staff/:staffId', deleteStaff);
router.get('/dashboard',fetchDashboardData);

export default router;
