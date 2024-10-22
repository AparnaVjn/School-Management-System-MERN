import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiurl } from '../config';

const initialState = {
  students: [],
  loading: false,
  error: null,
};

// Thunk to add student payment
export const addStudentPayment = createAsyncThunk(
  'students/addStudentPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const { admissionNo, feeType, amount, method } = paymentData;
      const response = await axios.post(`${apiurl}/students/addPayment/${admissionNo}`, {
        feeType,
        amount,
        method,
      });
      return response.data; // Return the updated student data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  adding a student
export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData, { rejectWithValue }) => {
    try {
    const response = await axios.post(`${apiurl}/addstudents`, studentData); 
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
  }
);

//  fetching students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const response = await axios.get(`${apiurl}/students`); 
    console.log('student data:',response.data)
    return response.data; 
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // Optionally, you can keep the local addStudent reducer if you want to manage local state
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchStudents cases
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        // Replace the current students array with the fetched students
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       // Handle addStudentPayment cases
       .addCase(addStudentPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudentPayment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedStudent = action.payload;

        // Find the student by ID and update the record
        const index = state.students.findIndex(
          (student) => student.admissionNo === updatedStudent.admissionNo
        );
        if (index !== -1) {
          state.students[index] = updatedStudent; // Update the student with the new payment details
        }
      })
      .addCase(addStudentPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const { addStudent } = studentSlice.actions;
export default studentSlice.reducer;
