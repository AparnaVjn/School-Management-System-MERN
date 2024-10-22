import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';  // Import axios
import { apiurl } from '../config';

// Initial state
const initialState = {
  selectedComponent: 'dashboard', 
  dashboard: {
    studentsCount: 200,
    staffCount: 30,
    booksCount: 1000,
    feeReceived: 50000,
    genderData: { boys: 120, girls: 80 },
    classData: {
      total: [30, 35, 40, 25, 40, 30],
      boys: [15, 20, 25, 12, 20, 18],
      girls: [15, 15, 15, 13, 20, 12]
    },
  },
  status: 'idle',
};

// Async thunk to fetch dashboard data using axios
export const fetchDashboardData = createAsyncThunk(
  'admin/fetchDashboardData',
  async () => {
    const response = await axios.get(`${apiurl}/dashboard-data`);  
    return response.data;  
  }
);

// Slice creation
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export const { setComponent } = adminSlice.actions;

export default adminSlice.reducer;
