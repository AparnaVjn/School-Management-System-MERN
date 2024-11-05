import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../../../slices/librarianSlice';
import BookDetailsModal from '../../Modals/BookDetails-Modal/BookDetailsModal';
import EditBookModal from '../../Modals/EditBook-Modal/EditBookModal';
import styles from './BookList.module.css';

function BookList() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.librarian);
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleBook, setVisibleBook] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const BookPerPage = 20;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (books.length > 0) {
      setVisibleBook(books.slice(0, BookPerPage));
    }
  }, [books]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreBooks();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleBook, books]);

  const loadMoreBooks = () => {
    const newPage = page + 1;
    const newBooks = books.slice(0, BookPerPage * newPage);
    setVisibleBook(newBooks);
    setPage(newPage);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleEditClick = (book) => {
    setEditBook(book);
    setShowEditModal(true);
  };

  const handleDeleteClick = (bookId) => {
    setBookToDelete(bookId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete))
        .then(() => {
          console.log("Book deleted successfully");
          setVisibleBook((prevBooks) => prevBooks.filter(book => book._id !== bookToDelete));
          dispatch(fetchBooks());
          setShowDeleteConfirm(false);
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
        });
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditBook(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirm(false);
    setBookToDelete(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.bookList}>
      <h2>Book List</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Language</th>
              <th>Category</th>
              <th>Serial Number</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleBook.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleBookClick(book)}
                    style={{ textDecoration: 'none' }}
                  >
                    {book.bookName}
                  </Button>
                </td>
                <td>{book.author}</td>
                <td>{book.language}</td>
                <td>{book.category}</td>
                <td>{book.serialNo}</td>
                <td>
                  {book.isAvailable ? "Available" : <span style={{ color: 'red' }}>Unavailable</span>}
                </td>
                <td>
                  <Button variant="warning" onClick={() => handleEditClick(book)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteClick(book._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* book details  modal */}
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          show={showModal}
          onClose={handleCloseModal}
        />
      )}

      {/*  edit book modal */}
      {editBook && (
        <EditBookModal
          book={editBook}
          show={showEditModal}
          onClose={handleCloseEditModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this book?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookList;
