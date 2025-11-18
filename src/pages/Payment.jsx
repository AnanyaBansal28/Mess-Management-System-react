import React from "react";
import { Link } from "react-router-dom";
import "../styles/payment.css";  

export default function Payment() {
  return (
    <>
      <div className="dashboard">
        <h1>Student Dashboard</h1>
        <p>Manage your meals, attendance, and feedback</p>
      </div>

      <div className="tabs">
        <Link to="/meals"><i className="fas fa-utensils"></i> Meals</Link>
        <Link to="/attendance"><i className="fa-regular fa-calendar"></i> Attendance</Link>
        <Link to="/payment"><i className="fa-regular fa-file"></i> Bill</Link>
        <Link to="/feedback"><i className="fa-regular fa-message"></i> Feedback</Link>
      </div>

      <div className="bill-box">
        <div className="bill-header"><i className="fa-regular fa-file"></i> Monthly Bill</div>

        <div className="month-cards">
          <div className="month-card current">
            <div>Current Month</div>
            <h2>₹2,450</h2>
            <p>23 meals consumed</p>
          </div>
          <div className="month-card previous">
            <div>Previous Month</div>
            <h2>₹2,850</h2>
            <p>28 meals consumed</p>
          </div>
        </div>

        <div className="breakdown">
          <h3>Bill Breakdown</h3>
          <div className="item">
            <span>Breakfast (8 times)</span>
            <span>₹200</span>
          </div>
          <div className="item">
            <span>Lunch (15 times)</span>
            <span>₹675</span>
          </div>
          <div className="item">
            <span>Dinner (12 times)</span>
            <span>₹480</span>
          </div>
        </div>

        <div className="total">
          <span>Total</span>
          <span>₹1,355</span>
        </div>

        <button className="pay-btn">Pay Now</button>
      </div>
    </>
  );
}
