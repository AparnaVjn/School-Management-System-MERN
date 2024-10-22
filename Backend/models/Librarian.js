import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const librarianSchema = new mongoose.Schema({
  librarianName: {
    type: String,
    required: true,
  },
  staffId: {
    type: String,
    required: true,
    unique: true, // To ensure that each staff ID is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // To ensure that each email is unique
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Simple validation for a 10-digit phone number
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving librarian
librarianSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('Librarian', librarianSchema);
