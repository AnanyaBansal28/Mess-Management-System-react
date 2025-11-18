// src/pages/MealPlanning.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/meal.css";   // ⬅️ updated path


const mealsData = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    price: '₹ 25',
    time: '7:00 AM - 10:00 AM',
    items: ['Poha', 'Sambar', 'Coconut Chutney', 'Tea/Coffee'],
    available: true
  },
  {
    id: 'lunch',
    title: 'Lunch',
    price: '₹ 45',
    time: '12:00 PM - 3:00 PM',
    items: ['Rice', 'Dal', 'Mixed Vegetable', 'Roti', 'Pickle'],
    available: true
  },
  {
    id: 'dinner',
    title: 'Dinner',
    price: '₹ 40',
    time: '7:00 PM - 10:00 PM',
    items: ['Jeera rice', 'Paneer Curry', 'Chapati', 'Raita'],
    available: true
  }
];

export default function MealPlanning() {
  const [selectedId, setSelectedId] = useState(null);

  function handleSelect(id) {
    setSelectedId(id);
  }

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

      <div className="menu-box">
        <div className="menu-header"><i className="fas fa-utensils"></i> Today's Menu</div>

        {mealsData.map(meal => (
          <div className="card" key={meal.id}>
            <h3>
              {meal.title} <span className="available">{meal.available ? 'Available' : 'Unavailable'}</span>
            </h3>
            <span className="price">{meal.price}</span>
            <div className="time"><i className="fa-regular fa-clock"></i> {meal.time}</div>
            <div className="items">
              {meal.items.map((it, i) => <span key={i}>{it}</span>)}
            </div>

            <div
              onClick={() => handleSelect(meal.id)}
              className={`select-btn ${selectedId === meal.id ? 'selected' : 'not-selected'}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSelect(meal.id); }}
            >
              {selectedId === meal.id ? 'Selected' : `Select ${meal.title}`}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
