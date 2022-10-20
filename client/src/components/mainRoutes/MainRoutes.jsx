import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/login/Login'
import SignUp from '../../pages/register/SignUp'
import Navbar from '../navbar/Navbar'


const MainRoutes = () => {
  return (

    <div>
        <Navbar />
            {/* <Route path="/" element={<Navbar />} /> */}
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />           
        </Routes>
    </div>
  )
}

export default MainRoutes