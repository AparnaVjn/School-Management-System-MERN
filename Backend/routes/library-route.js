import express from 'express';
import { addLibrarian, addBook, getBooks, updateBook, deleteBook, issueBookToStudent, returnBook } from '../controllers/LibraryController.js';

const router = express.Router();

router.post('/addLibrarians',addLibrarian);
router.post('/addBooks', addBook);
router.get('/books', getBooks );
router.put('/books/:id', updateBook);  
router.delete('/books/:id', deleteBook); 
router.post("/library/issueBook", issueBookToStudent);
router.post('/books/returnBook', returnBook);


export default router;