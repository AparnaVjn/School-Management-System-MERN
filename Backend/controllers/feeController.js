import Fee from '../models/Fee.js';
import Student from '../models/Student.js';

// Add a new fee
export const addFee = async (req, res) => {
  const { feeType, feeAmount, className } = req.body;
  console.log('fee data from api', req.body);

  try {
    const fee = new Fee({ feeType, feeAmount, className });
    await fee.save();

    // Update totalFees for all students in the specified class
    await Student.updateMany(
      { className },
      { $inc: { totalFees: feeAmount } }
    );
    
    res.status(201).json(fee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a fee by ID
export const updateFee = async (req, res) => {
  const { id } = req.params;
  const { feeType, feeAmount, className } = req.body;
  console.log('edited fee id:', id);
  console.log('fee data:', req.body);

  try {
    // Find the current fee to calculate the difference in amount
    const existingFee = await Fee.findById(id);
    if (!existingFee) {
      return res.status(404).json({ message: 'Fee not found' });
    }

    // Calculate the difference between the old and new fee amounts
    const feeDifference = feeAmount - existingFee.feeAmount;

    // Update the fee record
    const fee = await Fee.findByIdAndUpdate(
      id,
      { feeType, feeAmount, className },
      { new: true }
    );

    // Update totalFees for all students in the specified class
    await Student.updateMany(
      { className },
      { $inc: { totalFees: feeDifference } }
    );

    res.status(200).json(fee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a fee by ID
export const deleteFee = async (req, res) => {
  const { id } = req.params;

  try {
    const fee = await Fee.findByIdAndDelete(id);
    if (!fee) {
      return res.status(404).json({ message: 'Fee not found' });
    }

    // Decrement totalFees by the deleted feeAmount for students in the specified class
    await Student.updateMany(
      { className: fee.className },
      { $inc: { totalFees: -fee.feeAmount } }
    );

    res.status(200).json({ message: 'Fee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all fees
export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    console.log('fee data:', fees);
    res.status(200).json(fees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
