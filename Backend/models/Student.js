import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  admissionNo: {
    type: Number,
    required: true,
    unique: true
  },
  className: {
    type: Number,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  issuedBooks: [{
    bookId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Book'
    },
    bookName: {
      type: String
    },
    serialNo: {
      type: String
    },
    issueDate: {
      type: Date,
      default: Date.now
    }
  }],
  totalFees: {
    type: Number,
    required: true
  },
  amountPaid: {
    type: Number,
    required: true,
    default: 0
  },
  paymentHistory: [{
    paymentDate: {
      type: Date,
      default: Date.now
    },
    amount: {
      type: Number
    },
    feeType: {
      type: String
    },
    method: {
      type: String,
      enum: ['Cash', 'Card', 'Online Transfer']
    }
  }],
  dueAmount: {
    type: Number
  },
  paymentStatus: {
    type: String
  }
});

// Middleware to compute dueAmount and paymentStatus before saving
studentSchema.pre('save', function(next) {
  this.dueAmount = this.totalFees - this.amountPaid;
  
  if (this.amountPaid >= this.totalFees) {
    this.paymentStatus = 'Paid';
  } else if (this.amountPaid > 0) {
    this.paymentStatus = 'Partial';
  } else {
    this.paymentStatus = 'Pending';
  }
  
  // Prevent amountPaid from exceeding totalFees
  // if (this.amountPaid > this.totalFees) {
  //   return next(new Error('Amount paid cannot exceed total fees'));
  // }
  next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
