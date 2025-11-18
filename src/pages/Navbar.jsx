import "../styles/navbar.css";   // ⬅️ updated path
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo"><i className="fas fa-utensils"></i> UMESS</div>
        <div className="student-portal">Student Portal</div>
      </div>

      <div className="navbar-right">
        Welcome, Ananya Bansal
        <a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a>
      </div>
    </div>
  );
}
