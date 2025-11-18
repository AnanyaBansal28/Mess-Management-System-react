import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Navbar (your global top navigation)
import Navbar from "./pages/Navbar";

// UMESS pages
import Attendtrack from "./pages/Attendtrack";
import Inventory from "./pages/Inventory";
import Feedbacktrack from "./pages/Feedbacktrack";

// Admin system pages
import MealPlanning from "./pages/MealPlanning";
import Attendance from "./pages/Attendance";
import Payment from "./pages/Payment";
import Feedback from "./pages/Feedback";

import "./index.css";

export default function App() {
  return (
    <>
      {/* Global UMESS Navbar */}
      <Navbar />

      <Routes>
        {/* UMESS Pages */}
        <Route path="/" element={<Attendtrack />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/feedbacktrack" element={<Feedbacktrack />} />

        {/* Admin Pages */}
        <Route path="/meals" element={<MealPlanning />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Redirect all unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
