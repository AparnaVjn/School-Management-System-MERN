import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  category: { type: String, required: true },
  serialNo: { type: String, required: true, unique: true },
  isAvailable: { type: Boolean, default: true },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
