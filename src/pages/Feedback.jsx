// src/pages/Feedback.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/feedback.css';   // ✅ Updated CSS path

const initialFeedback = [
  {
    stars: 5,
    comment: 'Excellent dinner today! The paneer curry was delicious and well-prepared.',
    date: 'Dec 26, 2024'
  },
  {
    stars: 4,
    comment: 'Good lunch but could use more variety in vegetables. Overall satisfied.',
    date: 'Dec 25, 2024'
  }
];

export default function Feedback() {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      const saved = localStorage.getItem('umess_feedback');
      return saved ? JSON.parse(saved) : initialFeedback;
    } catch {
      return initialFeedback;
    }
  });

  useEffect(() => {
    localStorage.setItem('umess_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  function handleSubmit() {
    if (!rating || comment.trim() === '') return;

    const date = new Date();
    const formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newItem = { stars: rating, comment: comment.trim(), date: formatted };

    setFeedbackList(prev => [newItem, ...prev]);
    setRating(null);
    setComment('');
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

      <div className="card">
        <div className="card-header"><i className="fa-regular fa-message"></i> Share Your Feedback</div>

        <div>Rate Today’s Meal</div>
        <div className="stars">
          {[5,4,3,2,1].map(n => (
            <React.Fragment key={n}>
              <input
                type="radio"
                id={`star${n}`}
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                style={{ display: 'none' }}
              />
              <label
                htmlFor={`star${n}`}
                onClick={() => setRating(n)}
                dangerouslySetInnerHTML={{ __html: '&#9733;' }}
                style={{
                  cursor: 'pointer',
                  fontSize: 30,
                  color: rating && n <= rating ? '#facc15' : '#d1d5db'
                }}
              />
            </React.Fragment>
          ))}
        </div>

        <div>Your Comments</div>
        <textarea
          className="comment-box"
          placeholder="Share your thoughts about the food, service, or suggestions for improvement..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit}>Submit Feedback</button>
      </div>

      <div className="card">
        <div className="card-header">Your Recent Feedback</div>
        <div id="feedbackList">
          {feedbackList.map((fb, i) => (
            <div className="feedback-item" key={i}>
              <div className="stars" aria-hidden>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <i
                    key={idx}
                    className={`fas fa-star ${idx < fb.stars ? 'active' : ''}`}
                    style={{ color: idx < fb.stars ? '#facc15' : undefined }}
                  />
                ))}
              </div>

              <div style={{ marginTop: 6 }}>{fb.comment}</div>
              <div className="date">{fb.date}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
