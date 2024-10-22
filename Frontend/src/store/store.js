import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import adminReducer from '../slices/adminSlice';
import studentReducer from '../slices/studentSlice';
import staffReducer from '../slices/staffSlice';
import feeTypesReducer from '../slices/feeTypesSlice';
import librarianReducer from '../slices/librarianSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        students:studentReducer,
        staff:staffReducer,
        feeTypes: feeTypesReducer,
        librarian:librarianReducer,
    },
});

export default store;
