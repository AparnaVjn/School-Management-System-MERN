import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminPage from '../pages/Admin/AdminPage';
import LandingPage from '../pages/Landing-Page/LandingPage';
import StaffPage from '../pages/OffieStaff-Page/StaffPage';
import LibrarianPage from '../pages/Librarian-Page/LibrarianPage';
import ProtectedRoute from './ProtectedRoute';

function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      
      {/* Protected Routes */}
      <Route
        path="/adminpage"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staffpage"
        element={
          <ProtectedRoute allowedRoles={['Admin','Office Staff']}>
            <StaffPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/librarianpage"
        element={
          <ProtectedRoute allowedRoles={['Admin','Librarian']}>
            <LibrarianPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing;
