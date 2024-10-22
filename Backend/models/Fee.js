import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  feeType: {
    type: String,
    required: true,
  },
  feeAmount: {
    type: Number,
    required: true,
  },
  className: {
    type: Number,
    required: true,
  },
});

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;
