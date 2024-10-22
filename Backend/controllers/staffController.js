import Staff from '../models/Staff.js';
import User from '../models/userSchema.js';
import Student from '../models/Student.js';
import Book from '../models/Book.js';
import Fee from '../models/Fee.js';


// Add new staff
export const addStaff = async (req, res) => {
  const { staffName, designation, staffId, phoneNumber, email, password } = req.body;

  try {
    
    const newStaff = new Staff({ staffName, designation, staffId, phoneNumber, email });
    console.log('new staff data:', newStaff);
    
    
    await newStaff.validate(); 
    await newStaff.save();
    console.log('Staff saved successfully');

  

    const roleMapping = {
      'Manager': 'Office Staff',
      'Administrator': 'Office Staff',
      'Teacher': 'Office Staff',
      'Support Staff': 'Office Staff',
    };

    const userRole = roleMapping[designation] || 'Office Staff';
    console.log('Role:', userRole);

    const newUser = new User({
      name: staffName,
      email,
      password: password, 
      role: userRole, 
    });

    console.log('new user:', newUser);
    await newUser.save();
    console.log('User saved successfully');

   
    res.status(201).json({ newStaff, newUser });

  } catch (error) {
    console.log('Error occurred:', error.message);  
    res.status(400).json({ message: error.message });
  }
};



// Fetch all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff' });
  }
};

// Edit staff
export const editStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const updatedStaff = await Staff.findOneAndUpdate({ staffId }, req.body, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff' });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const staff = await Staff.findOneAndDelete({ staffId });
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff' });
  }
};


//fetch dashboard data
export const fetchDashboardData = async ( req, res ) => {
  try {
    const studentCount = await Student.countDocuments();
    const staffCount = await Staff.countDocuments();
    const bookCount = await Book.countDocuments();
    const totalFeesCollected = await Student.aggregate([
      { $group: { _id: null, total: { $sum: '$amountPaid' } } }
    ]);

    res.json({
      students: studentCount,
      staff: staffCount,
      books: bookCount,
      totalFeesCollected: totalFeesCollected[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
}