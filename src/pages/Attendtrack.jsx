import React, { useEffect, useState } from "react";
import "../styles/attendtrack.css"; 

export default function Attendancetrack() {
  // which tab is active: "daily" | "analytics" | "reports"
  const [activeTab, setActiveTab] = useState("daily");

  // controlled inputs for Mark Attendance popup
  const [studentId, setStudentId] = useState("");
  const [mealType, setMealType] = useState("");
  const [markDate, setMarkDate] = useState("");

  useEffect(() => {
    // preserve compatibility with any legacy script
    if (window.initAttendance) window.initAttendance();
  }, []);

  // POST attendance to API
  function markAttendance() {
    const date = markDate || new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    if (!studentId.trim()) return alert("Please enter Student ID");
    if (!mealType) return alert("Please select a meal type");

    fetch("http://localhost:4000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: studentId.trim(), date, meal: mealType }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Server responded with " + r.status);
        return r.json();
      })
      .then((res) => {
        console.log("attendance saved", res);
        alert("Attendance marked: " + studentId + " — " + mealType + " (" + date + ")");
        setStudentId("");
        setMealType("");
        setMarkDate("");
        window.location.hash = ""; // close overlay
      })
      .catch((err) => {
        console.error("Error saving attendance:", err);
        alert("Could not mark attendance (see console).");
      });
  }

  // Reports download helpers (simple demo)
  function downloadDailyReport() {
    const d = document.getElementById("daily-date")?.value;
    if (!d) return alert("Please choose a date");
    window.open(`http://localhost:4000/api/reports/daily/${d}`, "_blank");
  }

  function downloadMonthlyReport() {
    const m = document.getElementById("monthly-summary")?.value;
    if (!m) return alert("Please select a month");
    window.open(`http://localhost:4000/api/reports/monthly/${m}`, "_blank");
  }

  return (
    <div className="attendance-page">
      {/* Header */}
      <header>
        <h2>
          <i className="fa-solid fa-user-check"></i> Attendance Tracking
        </h2>
        <div className="actions">
          <a href="#calendar" className="date-box">
            31-12-2024 <i className="fa-solid fa-calendar-days"></i>
          </a>
          <a href="#markAttendance" className="btn-purple">
            <i className="fa-solid fa-check-circle"></i> Mark Attendance
          </a>
        </div>
      </header>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <p>
            <i className="fa-solid fa-users"></i> Today's Total
          </p>
          <h3 className="stat-purple">595</h3>
        </div>
        <div className="stat-card">
          <p>
            <i className="fa-solid fa-chart-line"></i> Attendance Rate
          </p>
          <h3 className="stat-green">40.8%</h3>
        </div>
        <div className="stat-card">
          <p>
            <i className="fa-solid fa-utensils"></i> Peak Meal
          </p>
          <h3 className="stat-orange">Lunch</h3>
        </div>
        <div className="stat-card">
          <p>
            <i className="fa-solid fa-user-graduate"></i> Active Students
          </p>
          <h3 className="stat-purple">486</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <a
          href="#"
          className={activeTab === "daily" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("daily");
          }}
        >
          <i className="fa-solid fa-list"></i> Daily Attendance
        </a>
        <a
          href="#"
          className={activeTab === "analytics" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("analytics");
          }}
        >
          <i className="fa-solid fa-chart-pie"></i> Analytics
        </a>
        <a
          href="#"
          className={activeTab === "reports" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("reports");
          }}
        >
          <i className="fa-solid fa-file-alt"></i> Reports
        </a>
      </div>

      {/* --------- DAILY TAB --------- */}
      {activeTab === "daily" && (
        <section id="daily">
          <div className="meal-cards">
            <div className="meal-card">
              <h4>
                <i className="fa-solid fa-mug-hot"></i> Breakfast
              </h4>
              <p>3 students</p>
              <div className="progress progress-orange">
                <span></span>
              </div>
            </div>

            <div className="meal-card">
              <h4>
                <i className="fa-solid fa-bowl-food"></i> Lunch
              </h4>
              <p>3 students</p>
              <div className="progress progress-green">
                <span></span>
              </div>
            </div>

            <div className="meal-card">
              <h4>
                <i className="fa-solid fa-drumstick-bite"></i> Dinner
              </h4>
              <p>4 students</p>
              <div className="progress progress-purple">
                <span></span>
              </div>
            </div>
          </div>

          <div className="students">
            <h3>
              <i className="fa-solid fa-user-graduate"></i> Student Attendance
            </h3>

            <div className="student-card">
              <div className="student-info">
                <strong>Rahul Sharma</strong>
                <br />
                CS21001
              </div>
              <div className="meals">
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Breakfast
                </span>
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Lunch
                </span>
                <span className="no">
                  <i className="fa-solid fa-xmark"></i> Dinner
                </span>
                <strong>2/3</strong>
              </div>
            </div>

            <div className="student-card">
              <div className="student-info">
                <strong>Priya Patel</strong>
                <br />
                ME21045
              </div>
              <div className="meals">
                <span className="no">
                  <i className="fa-solid fa-xmark"></i> Breakfast
                </span>
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Lunch
                </span>
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Dinner
                </span>
                <strong>2/3</strong>
              </div>
            </div>

            <div className="student-card">
              <div className="student-info">
                <strong>Amit Kumar</strong>
                <br />
                EE21023
              </div>
              <div className="meals">
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Breakfast
                </span>
                <span className="no">
                  <i className="fa-solid fa-xmark"></i> Lunch
                </span>
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Dinner
                </span>
                <strong>2/3</strong>
              </div>
            </div>

            <div className="student-card">
              <div className="student-info">
                <strong>Snehal Reddy</strong>
                <br />
                IT21067
              </div>
              <div className="meals">
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Breakfast
                </span>
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Lunch
                </span>
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Dinner
                </span>
                <strong>3/3</strong>
              </div>
            </div>

            <div className="student-card">
              <div className="student-info">
                <strong>Arjun Singh</strong>
                <br />
                CE21032
              </div>
              <div className="meals">
                <span className="no">
                  <i className="fa-solid fa-xmark"></i> Breakfast
                </span>
                <span className="no">
                  <i className="fa-solid fa-xmark"></i> Lunch
                </span>
                <span className="yes">
                  <i className="fa-solid fa-check"></i> Dinner
                </span>
                <strong>1/3</strong>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Calendar & Mark Attendance overlays */}
      <div id="calendar" className="overlay">
        <div className="popup">
          <a href="#" className="close-btn">
            &times;
          </a>
          <h3>
            <i className="fa-solid fa-calendar-days"></i> Select Date
          </h3>
          <input type="date" />
          <button className="btn-purple">
            <i className="fa-solid fa-plus"></i> Add Now
          </button>
        </div>
      </div>

      <div id="markAttendance" className="overlay">
        <div className="popup">
          <a href="#" className="close-btn">
            &times;
          </a>
          <h3>
            <i className="fa-solid fa-user-check"></i> Mark Student Attendance
          </h3>

          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="">Select Meal Type</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>

          <input
            type="date"
            value={markDate}
            onChange={(e) => setMarkDate(e.target.value)}
            style={{ marginTop: 8 }}
          />

          <button className="btn-purple" onClick={markAttendance}>
            <i className="fa-solid fa-check"></i> Make Present
          </button>
        </div>
      </div>

      {/* --------- ANALYTICS TAB --------- */}
      {activeTab === "analytics" && (
        <section id="analytics" style={{ marginTop: 20 }}>
          <div className="weekly-trends card" style={{ margin: "20px 30px" }}>
            <h3>Weekly Attendance Trends</h3>

            <div className="trend-card">
              <span className="date">2024-12-31</span>
              <div className="trend-values">
                <div className="trend">
                  <span className="num breakfast">180</span>
                  <small>Breakfast</small>
                </div>
                <div className="trend">
                  <span className="num lunch">220</span>
                  <small>Lunch</small>
                </div>
                <div className="trend">
                  <span className="num dinner">195</span>
                  <small>Dinner</small>
                </div>
                <div className="trend total">
                  <span className="num">595</span>
                  <small>Total</small>
                </div>
              </div>
            </div>

            <div className="trend-card">
              <span className="date">2024-12-30</span>
              <div className="trend-values">
                <div className="trend">
                  <span className="num breakfast">175</span>
                  <small>Breakfast</small>
                </div>
                <div className="trend">
                  <span className="num lunch">210</span>
                  <small>Lunch</small>
                </div>
                <div className="trend">
                  <span className="num dinner">185</span>
                  <small>Dinner</small>
                </div>
                <div className="trend total">
                  <span className="num">570</span>
                  <small>Total</small>
                </div>
              </div>
            </div>

            <div className="trend-card">
              <span className="date">2024-12-29</span>
              <div className="trend-values">
                <div className="trend">
                  <span className="num breakfast">165</span>
                  <small>Breakfast</small>
                </div>
                <div className="trend">
                  <span className="num lunch">200</span>
                  <small>Lunch</small>
                </div>
                <div className="trend">
                  <span className="num dinner">175</span>
                  <small>Dinner</small>
                </div>
                <div className="trend total">
                  <span className="num">540</span>
                  <small>Total</small>
                </div>
              </div>
            </div>
          </div>

          <div className="grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div className="card" style={{ minWidth: 260 }}>
              <h2>
                <i className="fa-solid fa-clock"></i> Peak Dining Hours
              </h2>
              <div className="peak-item peak-breakfast">
                <span>Breakfast Peak</span>
                <span>8:30 AM</span>
              </div>
              <div className="peak-item peak-lunch">
                <span>Lunch Peak</span>
                <span>1:00 PM</span>
              </div>
              <div className="peak-item peak-dinner">
                <span>Dinner Peak</span>
                <span>8:00 PM</span>
              </div>
            </div>

            <div className="card" style={{ minWidth: 260 }}>
              <h2>
                <i className="fa-solid fa-calendar-days"></i> Monthly Summary
              </h2>
              <div className="summary-grid" style={{ marginTop: 10 }}>
                <div className="summary-box">
                  <h3 className="blue">15,420</h3>
                  <p>Total Meals</p>
                </div>
                <div className="summary-box">
                  <h3 className="green">87%</h3>
                  <p>Avg Attendance</p>
                </div>
                <div className="summary-box">
                  <h3 className="orange">28</h3>
                  <p>Active Days</p>
                </div>
                <div className="summary-box">
                  <h3 className="purple">486</h3>
                  <p>Students</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --------- REPORTS TAB --------- */}
      {activeTab === "reports" && (
        <section id="reports" style={{ marginTop: 20 }}>
          <div className="report-container" style={{ padding: "20px 0" }}>
            <div className="report-box">
              <h3>Daily Attendance Report</h3>
              <p>Generate detailed attendance report for a specific date</p>
              <input className="input-field" type="date" id="daily-date" />
              <button className="button" onClick={downloadDailyReport}>
                <i className="fa-solid fa-arrow-down"></i> Download Report
              </button>
            </div>

            <div className="report-box">
              <h3>Monthly Summary</h3>
              <p>Comprehensive monthly attendance analysis</p>
              <select className="input-field" id="monthly-summary" defaultValue="">
                <option value="" disabled>
                  Select month
                </option>
                <option value="2024-01">January 2024</option>
                <option value="2024-02">February 2024</option>
                <option value="2024-03">March 2024</option>
                <option value="2024-04">April 2024</option>
                <option value="2024-05">May 2024</option>
                <option value="2024-06">June 2024</option>
                <option value="2024-07">July 2024</option>
                <option value="2024-08">August 2024</option>
                <option value="2024-09">September 2024</option>
                <option value="2024-10">October 2024</option>
                <option value="2024-11">November 2024</option>
                <option value="2024-12">December 2024</option>
              </select>
              <button className="button" onClick={downloadMonthlyReport}>
                <i className="fa-solid fa-arrow-down"></i> Download Report
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
