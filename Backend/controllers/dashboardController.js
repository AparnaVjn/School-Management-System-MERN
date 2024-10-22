// controllers/dashboardController.js
import Student from '../models/Student.js';
import Staff from '../models/Staff.js';
import Book from '../models/Book.js';
import Fee from '../models/Fee.js';

export const getDashboardData = async (req, res) => {
    try {
        const students = await Student.find({});
        const staff = await Staff.find({});
        const books = await Book.find({})

        // Total counts
        const studentsCount = students.length;
        const staffCount = staff.length;
        const booksCount = books.length;
        const feeReceived = students.reduce((acc, student) => acc + student.amountPaid, 0);

        // Gender distribution
        const boysCount = students.filter(student => student.gender === 'Male').length;
        const girlsCount = students.filter(student => student.gender === 'Female').length;

        // Class wise distribution
        const classData = { total: [], boys: [], girls: [] };
        for (let i = 5; i <= 10; i++) {
            const studentsInClass = students.filter(student => parseInt(student.className) === i);
            console.log(`Class ${i} has ${studentsInClass.length} students`);
          
            const boysInClass = studentsInClass.filter(student => student.gender === 'Male').length;
            const girlsInClass = studentsInClass.filter(student => student.gender === 'Female').length;
          
            console.log(`Class ${i} has ${boysInClass} boys and ${girlsInClass} girls`);
          
            classData.total.push(studentsInClass.length);
            classData.boys.push(boysInClass);
            classData.girls.push(girlsInClass);
          }
          
          

        console.log('class data',classData)
        res.status(200).json({
            studentsCount,
            staffCount,
            booksCount,
            feeReceived,
            genderData: { boys: boysCount, girls: girlsCount },
            classData
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dashboard data', error });
    }
};
