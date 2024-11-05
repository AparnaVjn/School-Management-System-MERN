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
studentSchema.pre('validate', function(next) {
  // Calculate the total amount paid from payment history
  this.amountPaid = this.paymentHistory.reduce((total, payment) => total + payment.amount, 0);
  
  // Calculate due amount as total fees minus the amount paid
  this.dueAmount = this.totalFees - this.amountPaid;
  
  // Determine payment status based on the amount paid relative to total fees
  if (this.amountPaid >= this.totalFees) {
    this.paymentStatus = 'Paid';
  } else if (this.amountPaid > 0) {
    this.paymentStatus = 'Partial';
  } else {
    this.paymentStatus = 'Pending';
  }
  
  next();
});


const Student = mongoose.model('Student', studentSchema);
export default Student;
