import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiurl } from '../config';

const initialState = {
  selectedComponent: 'dashboard',  
  staff: [],                       
  students: 0,                     
  books: 0,                        
  totalFeesCollected: 0,           
  loading: false,                  
  error: null,                     
};

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  'staff/fetchDashboardData', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/dashboard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add staff by making an API call
export const addStaffToDB = createAsyncThunk(
  'staff/addStaffToDB',
  async (staffData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/addstaff`, staffData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch staff list
export const fetchStaffList = createAsyncThunk(
  'staff/fetchStaffList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/staff`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit staff
export const editStaffInDB = createAsyncThunk(
  'staff/editStaffInDB',
  async (staffData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiurl}/staff/${staffData.staffId}`, staffData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete staff
export const deleteStaffFromDB = createAsyncThunk(
  'staff/deleteStaffFromDB',
  async (staffId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiurl}/staff/${staffId}`);
      return staffId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the staff slice with additional logic for the dashboard
const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add staff
    builder
      .addCase(addStaffToDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStaffToDB.fulfilled, (state, action) => {
        state.loading = false;
        state.staff.push(action.payload);
      })
      .addCase(addStaffToDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch staff list
    builder
      .addCase(fetchStaffList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaffList.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(fetchStaffList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Edit staff
    builder
      .addCase(editStaffInDB.fulfilled, (state, action) => {
        const index = state.staff.findIndex((staff) => staff.staffId === action.payload.staffId);
        if (index !== -1) {
          state.staff[index] = action.payload;
        }
      });

    // Delete staff
    builder
      .addCase(deleteStaffFromDB.fulfilled, (state, action) => {
        state.staff = state.staff.filter((staff) => staff.staffId !== action.payload);
      });

    // Fetch dashboard data
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.staff = action.payload.staff;
        state.books = action.payload.books;
        state.totalFeesCollected = action.payload.totalFeesCollected;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setComponent } = staffSlice.actions;
export default staffSlice.reducer;
