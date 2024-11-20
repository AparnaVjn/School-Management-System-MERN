import Student from '../models/Student.js';
import Fee from '../models/Fee.js'

// Add a new student
export const addStudent = async (req, res) => {
  try {
    const { studentName, admissionNo, className, division, gender } = req.body;
    console.log('Input data:', req.body);

      // Fetch fee types for the given class
      const feeTypes = await Fee.find({ className });

      // Calculate the total fees by summing the amount for all fee types
      const totalFees = feeTypes.reduce((sum, fee) => sum + fee.feeAmount, 0);

    
    const newStudent = new Student({
      studentName,
      admissionNo,
      className,
      division,
      gender,
      totalFees, 
      amountPaid: 0,    
    });

    console.log('New student:', newStudent);

    await newStudent.save();
    console.log('Student saved successfully');

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    console.log('students:',students)
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Add student fee payment
export const addStudentPayment = async (req, res) => {
  const { admissionNo } = req.params;  // Extract admission number from params
  const { feeType, amount, method } = req.body;  // Extract payment details from request body

  try {
    // Find the student by admission number
    const student = await Student.findOne({ admissionNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Validate if the payment amount is valid
    // if (student.amountPaid + amount > student.totalFees) {
    //   return res.status(400).json({ message: "Amount exceeds total fees" });
    // }

    // Add payment to student's payment history
    student.paymentHistory.push({ feeType, amount, method });

    // Update the amountPaid
    student.amountPaid += amount;

    // Save the updated student data
    await student.save();

    return res.status(200).json(student); // Return updated student data
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// controllers/studentController.js
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student' });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student' });
  }
};
