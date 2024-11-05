import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiurl } from '../config';

const initialState = {
  selectedComponent: 'dashboard',
  librarians: [],
  books: [], 
  loading: false,
  error: null,
};

// Async thunk to add librarian
export const addLibrarian = createAsyncThunk(
  'librarians/addLibrarian',
  async (librarianData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/addLibrarians`, librarianData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add book data
export const addBook = createAsyncThunk(
  'librarians/addBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/addbooks`, bookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Fetch Books
export const fetchBooks = createAsyncThunk(
  'librarians/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/books`); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Edit Book
export const editBook = createAsyncThunk(
  'librarians/editBook',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiurl}/books/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  delete a book
export const deleteBook = createAsyncThunk(
  'librarians/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiurl}/books/${id}`);
      return id;  // Return the ID of the deleted book to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Book Issue
export const issueBookToStudent = createAsyncThunk(
  "books/issueBookToStudent",
  async ({ admissionNo, serialNo, bookName }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/library/issueBook`, {
        admissionNo,
        serialNo,
        bookName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Return Book
export const returnBook = createAsyncThunk(
  'books/returnBook',
  async (serialNo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/books/returnBook`, { serialNo });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Librarian slice
const librarianSlice = createSlice({
  name: 'librarians',
  initialState,
  reducers: {
    setComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling addLibrarian cases
      .addCase(addLibrarian.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLibrarian.fulfilled, (state, action) => {
        state.loading = false;
        state.librarians.push(action.payload);
      })
      .addCase(addLibrarian.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling addBook cases
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload); 
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      //fetchBooks cases
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling editBook cases
      .addCase(editBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex((book) => book._id === action.payload.book._id);
        if (index !== -1) {
          state.books[index] = action.payload.book;  
        }
      })
      .addCase(editBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling deleteBook cases
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book._id !== action.payload);  
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handling Book Issue
      .addCase(issueBookToStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(issueBookToStudent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(issueBookToStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Handle Book Return
      .addCase(returnBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setComponent } = librarianSlice.actions;
export default librarianSlice.reducer;
