// store/feeTypesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiurl } from '../config';

// Async Thunks
export const fetchFeeTypes = createAsyncThunk('feeTypes/fetchFeeTypes', async () => {
  const response = await axios.get(`${apiurl}/fees`);
  console.log('fetched fee data:', response);
  return response.data;
});

export const addFeeType = createAsyncThunk('feeTypes/addFeeType', async (feeData) => {
  const response = await axios.post(`${apiurl}/fees/add`, feeData);
  return response.data;
});

export const updateFeeType = createAsyncThunk('feeTypes/updateFeeType', async (feeData) => {
  console.log('updating fee data:', feeData);
  const { id, ...rest } = feeData;
  const response = await axios.put(`${apiurl}/fees/update/${id}`, rest);
  return response.data;
});

export const deleteFeeType = createAsyncThunk('feeTypes/deleteFeeType', async (id) => {
  await axios.delete(`${apiurl}/fees/delete/${id}`);
  return id;  // Returning the id of the deleted fee
});

const feeTypesSlice = createSlice({
  name: 'feeTypes',
  initialState: { feeTypes: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeTypes.fulfilled, (state, action) => {
        state.feeTypes = action.payload;  // Populate the feeTypes state
      })
      .addCase(addFeeType.fulfilled, (state, action) => {
        state.feeTypes.push(action.payload);  // Add new fee type to the list
      })
      .addCase(updateFeeType.fulfilled, (state, action) => {
        // Find the index of the fee with the same id as in the payload
        const index = state.feeTypes.findIndex(fee => fee._id === action.payload._id);
        if (index !== -1) {
          // Update the fee type at the found index
          state.feeTypes[index] = {
            ...state.feeTypes[index], // Keep old fee data
            ...action.payload // Replace with new data from the response
          };
        }
      })
      .addCase(deleteFeeType.fulfilled, (state, action) => {
        // Filter out the fee type with the matching id (action.payload contains the deleted id)
        state.feeTypes = state.feeTypes.filter(fee => fee._id !== action.payload);
      });
  }
});

export default feeTypesSlice.reducer;
