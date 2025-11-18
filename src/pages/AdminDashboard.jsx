import React from "react";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const statsData = [
    { title: "Today's Meals", value: "1,247", icon: "fa-arrow-trend-up" },
    { title: "Revenue", value: "₹45,230", icon: "fa-chart-column" },
    { title: "Active Students", value: "486", icon: "fa-users" },
    { title: "This Month", value: "28 Days", icon: "fa-calendar" }
  ];

  const featuresData = [
    { color: "#ff7a00", icon: "fa-utensils", title: "Menu Management",
      desc: "Plan daily meals, set pricing, and manage dietary preferences",
      link: "/menu", btnClass: "btn-orange" },
    { color: "rgb(82,184,82)", icon: "fa-box-open", title: "Inventory Control",
      desc: "Track stock levels, manage suppliers, and monitor usage",
      link: "/inventory", btnClass: "btn-green" },
    { color: "rgb(49,91,230)", icon: "fa-message", title: "Feedback System",
      desc: "Review student feedback, ratings, and suggestions",
      link: "/feedback", btnClass: "btn-blue" },
    { color: "rgb(169,3,169)", icon: "fa-users", title: "Attendance Tracking",
      desc: "Monitor meal attendance and analyze dining patterns",
      link: "/attendance", btnClass: "btn-purple" }
  ];

  const activityData = [
    { text: 'New menu item "Paneer Butter Masala" added', time: "2 hours ago" },
    { text: "Inventory update: Rice stock replenished", time: "4 hours ago" },
    { text: "Student feedback received for breakfast menu", time: "6 hours ago" }
  ];

  return (
    <div className="admin-dashboard">
      <header>
        <div className="logo">
          <i className="fa-solid fa-utensils"></i> UMESS
          <span className="role-badge">Administrator</span>
        </div>
        <a href="/" className="logout">
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </a>
      </header>

      <div className="dashboard">
        <h2>Dashboard</h2>
        <p className="subtitle">Manage your mess operations efficiently</p>

        <div className="stats">
          {statsData.map((s, idx) => (
            <div className="stat-card" key={idx}>
              <p>{s.title}</p>
              <h3>{s.value}</h3>
              <div className="icon-circle"><i className={`fa-solid ${s.icon}`}></i></div>
            </div>
          ))}
        </div>

        <div className="features">
          {featuresData.map((f, idx) => (
            <div className="feature-card" key={idx}>
              <div className="icon-box" style={{background: f.color}}>
                <i className={`fa-solid ${f.icon}`}></i>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <a href={f.link} className={`btn ${f.btnClass}`}>Manage</a>
            </div>
          ))}
        </div>

        <div className="activity">
          <h4><i className="fa-solid fa-chart-column" style={{color: "blue"}}></i> Recent Activity</h4>
          <div className="activity-list">
            {activityData.map((a, idx) => (
              <div className="activity-item" key={idx}>
                <div>{a.text}</div>
                <span>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
