import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    enum: ['Manager', 'Teacher', 'Administrator', 'Support Staff'], // Restrict values
  },
  staffId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Ensures it's a 10-digit phone number
  },
  email: {
      type: String,
      required: true,
      unique: true,
      
  },

}, {
  timestamps: true, 
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
