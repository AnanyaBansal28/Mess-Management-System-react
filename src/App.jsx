import { Routes, Route, Navigate } from "react-router-dom";

// Pages in your /pages folder
import Navbar from "./pages/Navbar";
import MealPlanning from "./pages/MealPlanning";
import Attendance from "./pages/Attendance";
import Payment from "./pages/Payment";
import Feedback from "./pages/Feedback";

import "./index.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/meals" element={<MealPlanning />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/meals" replace />} />
      </Routes>
    </>
  );
}
