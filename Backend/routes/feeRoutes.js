import express from 'express';
import {
  addFee,
  getFees,
  updateFee,
  deleteFee
} from '../controllers/feeController.js';

const router = express.Router();

// POST - Add a new fee
router.post('/add', addFee);

// GET - Get all fees
router.get('/', getFees);

// PUT - Update a fee by ID
router.put('/update/:id', updateFee);

// DELETE - Delete a fee by ID
router.delete('/delete/:id', deleteFee);

export default router;
