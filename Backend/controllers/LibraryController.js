import Librarian from '../models/Librarian.js'
import User from '../models/userSchema.js';
import Book from '../models/Book.js';
import Student from '../models/Student.js';

// Add a new Librarian
export const addLibrarian = async (req,res) => {
    const { librarianName, staffId, email, phone, password } = req.body;

    try {
        const newLibrarian = new Librarian({librarianName, staffId, email, phone});

        await newLibrarian.validate();
        await newLibrarian.save();

        const userRole = 'Librarian'

        const newUser = new User({
            name: librarianName,
            email,
            password,
            role: userRole,
        });
        await newUser.save();

        res.status(201).json({ newLibrarian, newUser })
    } catch (error) {
        console.log('Error occurred:', error.message);  
        res.status(400).json({ message: error.message });
      }
}


// Controller for adding a book
export const addBook = async (req, res) => {
  try {
    const { bookName, author, language, category, serialNo } = req.body;

    if (!bookName || !author || !language || !category || !serialNo) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // const existingBook = await Book.findOne({ serialNo });
    // if (existingBook) {
    //   return res.status(400).json({ message: 'Book with this serial number already exists.' });
    // }

    const newBook = new Book({ bookName, author, language, category, serialNo });
    console.log('book data:',newBook)
    await newBook.save();

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch all books
export const getBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();  // Fetch all books from the database
    if (allBooks.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }
    res.status(200).json(allBooks);  // Send the books as the response
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to retrieve books. Please try again later.' });
  }
};


// Update a book by ID
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Issue Book to Student
export const issueBookToStudent = async (req, res) => {
  try {
    const { admissionNo, serialNo, bookName } = req.body;

    // Find student by admission number
    const student = await Student.findOne({ admissionNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the book by serial number and check if it's available
    const book = await Book.findOne({ serialNo });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (!book.isAvailable) {
      return res.status(400).json({ message: "Book is not available" });
    }

    // Add the book to the student's issuedBooks
    student.issuedBooks.push({
      bookId: book._id,
      bookName: book.bookName,
      serialNo: book.serialNo,
      issueDate: new Date(),
    });

    // Mark the book as unavailable
    book.isAvailable = false;

    // Save both student and book records
    await student.save();
    await book.save();

    res.status(200).json({ message: "Book issued successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Return a book and update records
export const returnBook = async (req, res) => {
  const { serialNo } = req.body;

  try {
    const book = await Book.findOne({ serialNo });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const student = await Student.findOne({ 'issuedBooks.bookId': book._id });
    
    if (!student) {
      return res.status(404).json({ message: 'Book is not issued to any student' });
    }

    // Remove book from issuedBooks array and update book availability
    student.issuedBooks = student.issuedBooks.filter(
      (issue) => issue.bookId.toString() !== book._id.toString()
    );
    await student.save();

    book.isAvailable = true;
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};






