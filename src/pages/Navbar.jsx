import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="site-navbar">
      <div className="navbar-left">
        <div className="brand">
          <span className="brand-icon">🍽️</span>
          <span className="brand-text">UMESS</span>
          <span className="role-pill">Administrator</span>
        </div>

        <nav className="main-links" aria-label="Main navigation">
          <Link to="/">Attendance</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/feedback">Feedback</Link>
        </nav>
      </div>

      <div className="navbar-right">
        <button
          className="logout-btn"
          onClick={() => {
            /* replace with real logout later */
            alert("Logout clicked");
          }}
        >
          ↪ Logout
        </button>
      </div>
    </header>
  );
}
