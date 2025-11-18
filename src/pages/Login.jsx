import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";

const API_URL = "https://691af6f42d8d78557570e611.mockapi.io/api/v1/users";

const Login = () => {
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState("admin-login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (role) => {
    try {
      await axios.post(API_URL, {
        name: fullName || studentId,
        email: email || studentId,
        password,
        role,
      });

      alert("Signup Successful!");

      setActiveForm(role === "admin" ? "admin-login" : "student-login");

      setFullName("");
      setEmail("");
      setStudentId("");
      setPassword("");

    } catch (err) {
      alert("Signup Failed. Try again.");
      console.log(err);
    }
  };

  const handleLogin = (role) => async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(API_URL);
      const users = res.data;

      const user = users.find(
        (u) =>
          u.role === role &&
          u.password === password &&
          (role === "admin"
            ? u.email === email
            : u.email === studentId || u.name === studentId)
      );

      if (!user) {
        alert("Invalid Credentials!");
        return;
      }

      alert("Login Successful!");

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/menu");
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="logo">
        <i className="fa-solid fa-utensils" style={{ color: "#4a3aff" }}></i>{" "}
        UMESS
      </div>
      <div className="subtitle">Access your mess management portal</div>

      <div className="container">
        <h2>Welcome Back</h2>

        <div className="role-switch">
          <button
            className={activeForm.includes("admin") ? "active" : ""}
            onClick={() => setActiveForm("admin-login")}
          >
            Admin/Staff
          </button>
          <button
            className={activeForm.includes("student") ? "active" : ""}
            onClick={() => setActiveForm("student-login")}
          >
            Student
          </button>
        </div>

        {activeForm === "admin-login" && (
          <form onSubmit={handleLogin("admin")} className="form-box">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn">
              Login
            </button>

            <p className="signup-text">
              New here?{" "}
              <span onClick={() => setActiveForm("admin-signup")}>Sign Up</span>
            </p>
          </form>
        )}

        {activeForm === "admin-signup" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup("admin");
            }}
            className="form-box"
          >
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn">
              Sign Up
            </button>

            <p className="signup-text">
              Already have an account?{" "}
              <span onClick={() => setActiveForm("admin-login")}>Login</span>
            </p>
          </form>
        )}

        {activeForm === "student-login" && (
          <form onSubmit={handleLogin("student")} className="form-box">
            <label>Student ID</label>
            <input
              type="text"
              placeholder="Enter student ID"
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn">
              Login
            </button>

            <p className="signup-text">
              New here?{" "}
              <span onClick={() => setActiveForm("student-signup")}>
                Sign Up
              </span>
            </p>
          </form>
        )}

        {activeForm === "student-signup" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup("student");
            }}
            className="form-box"
          >
            <label>Student ID</label>
            <input
              type="text"
              placeholder="Enter student ID"
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn">
              Sign Up
            </button>

            <p className="signup-text">
              Already have an account?{" "}
              <span onClick={() => setActiveForm("student-login")}>Login</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;