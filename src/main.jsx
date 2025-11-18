// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';

// Updated CSS paths
import './styles/meal.css';
import './styles/attendance.css';
import './styles/payment.css';
import './styles/feedback.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
