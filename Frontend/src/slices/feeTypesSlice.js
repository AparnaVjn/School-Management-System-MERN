import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiurl } from '../config';

// Fetch fee types
export const fetchFeeTypes = createAsyncThunk('feeTypes/fetchFeeTypes', async () => {
  const response = await axios.get(`${apiurl}/fees`);
  return response.data;
});

// Add fee type
export const addFeeType = createAsyncThunk('feeTypes/addFeeType', async (feeData) => {
  const response = await axios.post(`${apiurl}/fees/add`, feeData);
  return response.data;
});

// Update a fee type
export const updateFeeType = createAsyncThunk('feeTypes/updateFeeType', async (feeData) => {
  const { id, ...rest } = feeData;
  const response = await axios.put(`${apiurl}/fees/update/${id}`, rest);
  return response.data;
});

// Delete a fee type
export const deleteFeeType = createAsyncThunk('feeTypes/deleteFeeType', async (id) => {
  await axios.delete(`${apiurl}/fees/delete/${id}`);
  return id;  
});

const feeTypesSlice = createSlice({
  name: 'feeTypes',
  initialState: { feeTypes: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeTypes.fulfilled, (state, action) => {
        state.feeTypes = action.payload;  
      })
      .addCase(addFeeType.fulfilled, (state, action) => {
        state.feeTypes.push(action.payload);  
      })
      .addCase(updateFeeType.fulfilled, (state, action) => {

        const index = state.feeTypes.findIndex(fee => fee._id === action.payload._id);
        if (index !== -1) {
          state.feeTypes[index] = {
            ...state.feeTypes[index], 
            ...action.payload
          };
        }
      })
      .addCase(deleteFeeType.fulfilled, (state, action) => {
        state.feeTypes = state.feeTypes.filter(fee => fee._id !== action.payload);
      });
  }
});

export default feeTypesSlice.reducer;
