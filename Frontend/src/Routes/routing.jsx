import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminPage from '../pages/Admin/AdminPage';
import LandingPage from '../pages/Landing-Page/LandingPage';
import StaffPage from '../pages/OffieStaff-Page/StaffPage';
import LibrarianPage from '../pages/Librarian-Page/LibrarianPage';

function Routing() {
  return (
    <Routes>
        <Route exact path='/'  element={<LandingPage/>} />
        <Route path='/adminpage' element={<AdminPage/>}  />
        <Route path='/staffpage' element={<StaffPage/>}  />
        <Route path='/librarianpage' element={<LibrarianPage/>}  />
    </Routes>
  )
}

export default Routing

