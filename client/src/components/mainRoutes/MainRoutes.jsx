import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "../../pages/board/components/Board";
import Login from "../../pages/login/Login";
import SignUp from "../../pages/register/SignUp";
import Navbar from "../navbar/Navbar";

const MainRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/drawboard" element={<Board width={850} height={550} />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
