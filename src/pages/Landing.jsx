import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <header>
        <div className="logo">
          <i className="fa-solid fa-utensils" style={{color:"#4a3aff"}}></i> UMESS
        </div>
        <Link to="/login" className="login-btn">Login</Link>
      </header>

      <section className="hero">
        <h1>Welcome to <span>UMESS</span></h1>
        <p>
          Your comprehensive university mess management solution. Streamline meal planning,
          track attendance, manage inventory, and enhance the dining experience for everyone.
        </p>
        <div className="buttons">
          <Link to="/login" className="landing-btn landing-btn-primary">Get Started</Link>
          <a href="#stats" className="landing-btn landing-btn-secondary">Learn More</a>
</div>

      </section>

      <section id="features" className="features">
        <div className="card">
          <i className="fa-solid fa-utensils" style={{color:'#4a3aff'}}></i>
          <h3>Smart Meal Planning</h3>
          <p>Efficiently plan and manage daily meals with automated scheduling and nutritional tracking.</p>
        </div>
        <div className="card">
          <i className="fa-solid fa-shield-halved" style={{color:'green'}}></i>
          <h3>Inventory Control</h3>
          <p>Track ingredients, manage stock levels, and automate reordering to minimize waste.</p>
        </div>
        <div className="card">
          <i className="fa-solid fa-users" style={{color:'purple'}}></i>
          <h3>User Management</h3>
          <p>Seamlessly manage student and staff accounts with role-based access control.</p>
        </div>
      </section>

      <section id="stats" className="stats">
        <h2>Trusted by Universities</h2>
        <div className="stat-box">
          <div className="stat">500+ <small>Students Served</small></div>
          <div className="stat">50+ <small>Staff Members</small></div>
          <div className="stat">1000+ <small>Meals Daily</small></div>
          <div className="stat">99% <small>Satisfaction</small></div>
        </div>
      </section>

      <footer>
        UMESS <br />
        © {new Date().getFullYear()} UMESS. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
