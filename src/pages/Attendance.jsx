// src/pages/Attendance.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/attendance.css';  // ✅ Updated CSS path

export default function Attendance() {
  const recent = [
    { date: 'Dec 27, 2024', present: true },
    { date: 'Dec 26, 2024', present: true },
    { date: 'Dec 25, 2024', present: true },
    { date: 'Dec 24, 2024', present: true },
    { date: 'Dec 23, 2024', present: false },
  ];

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

      <div className="attendance-box">
        <div className="attendance-header"><i className="fa-regular fa-calendar"></i> Meal Attendance</div>

        <div className="stats">
          <div className="stat-card stat-green">
            <h2>87%</h2>
            <p>This Month</p>
          </div>
          <div className="stat-card stat-blue">
            <h2>23/26</h2>
            <p>Days Present</p>
          </div>
          <div className="stat-card stat-orange">
            <h2>3</h2>
            <p>Days Missed</p>
          </div>
        </div>

        <div className="recent">Recent Attendance</div>

        <div className="attendance-list">
          {recent.map((r, i) => (
            <div className="attendance-item" key={i}>
              <div className="attendance-date">
                <span className={`dot ${r.present ? 'green' : 'red'}`}></span>
                {r.date}
              </div>
              <div className={r.present ? 'status-present' : 'status-absent'}>
                {r.present ? (
                  <>
                    <i className="fas fa-check"></i> Present
                  </>
                ) : (
                  <>
                    <i className="fas fa-times"></i> Absent
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
