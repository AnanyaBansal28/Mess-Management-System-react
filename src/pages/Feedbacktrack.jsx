import React, { useEffect } from "react";
import "../styles/feedbacktrack.css";


export default function Feedbacktrack() {
  useEffect(() => {
    // review buttons
    document.querySelectorAll(".feedback-page .reviewBtn").forEach((btn) => {
      btn.onclick = function () {
        const box = btn.closest(".feedback");
        if (!box) return;
        box.dataset.status = "REVIEWED";
        const status = box.querySelector(".status");
        if (status) status.innerHTML = "<span>REVIEWED</span>";
      };
    });

    // reply buttons
    document.querySelectorAll(".feedback-page .replyBtn").forEach((btn) => {
      btn.onclick = function () {
        const reply = window.prompt("Enter your response:");
        if (reply) {
          const box = btn.closest(".feedback");
          if (!box) return;
          box.dataset.status = "RESPONDED";
          const status = box.querySelector(".status");
          if (status) status.innerHTML = "<span>RESPONDED</span>";
          const r = document.createElement("div");
          r.className = "admin-response";
          r.innerHTML = "<b>Admin Response:</b> " + reply;
          box.appendChild(r);
        }
      };
    });

    // filter menu
    document.querySelectorAll(".feedback-page #filterMenu a").forEach((option) => {
      option.onclick = function () {
        const f = option.dataset.filter;
        document.querySelectorAll(".feedback-page #feedbackList .feedback").forEach((box) => {
          box.style.display = f === "all" || box.dataset.status === f ? "block" : "none";
        });
      };
    });
  }, []);

  return (
    <div className="feedback-page">
      <header>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="#" style={{ textDecoration: "none", fontSize: "18px", color: "#333" }}>
            <i className="fa-solid fa-arrow-left"></i>
          </a>
          <h2><i className="fa-solid fa-message" style={{ color: "blue" }}></i> Feedback System</h2>
        </div>

        <div className="dropdown">
          <button className="dropbtn"> All Feedback <i className="fa-solid fa-caret-down"></i></button>
          <div className="dropdown-content" id="filterMenu">
            <a data-filter="all"><i className="fa-solid fa-list"></i> All Feedback</a>
            <a data-filter="NEW"><i className="fa-solid fa-star"></i> New</a>
            <a data-filter="REVIEWED"><i className="fa-solid fa-check"></i> Reviewed</a>
            <a data-filter="RESPONDED"><i className="fa-solid fa-reply"></i> Responded</a>
          </div>
        </div>
      </header>

      <div id="feedbackList">
        <div className="feedback" data-status="NEW">
          <strong>Vrinda Kapoor (0321)</strong>
          <span className="tags status"><span>NEW</span><span>FOOD QUALITY</span></span>
          <p>Lunch - 01-09-2025 <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></p>
          <p>Excellent paneer curry today! The spices were perfectly balanced and the rice was cooked well.</p>
          <div className="buttons">
            <button className="reviewBtn"><i className="fa-solid fa-check"></i> Mark as Reviewed</button>
            <button className="replyBtn"><i className="fa-solid fa-reply"></i> Respond</button>
          </div>
        </div>

        <div className="feedback" data-status="REVIEWED">
          <strong>Ananya Bansal (0259)</strong>
          <span className="tags status"><span>REVIEWED</span><span>FOOD QUALITY</span></span>
          <p>Breakfast - 01-09-2025 <span className="stars">&#9733;&#9733;&#9733;</span></p>
          <p>The poha was okay but could use more vegetables.</p>
          <div className="buttons"><button className="replyBtn"><i className="fa-solid fa-reply"></i> Respond</button></div>
        </div>

        <div className="feedback" data-status="RESPONDED">
          <strong>Gurasees (0293)</strong>
          <span className="tags status"><span>RESPONDED</span><span>HYGIENE</span></span>
          <p>Dinner - 04-09-2025 <span className="stars">&#9733;</span></p>
          <p>Food was cold and the area was not clean.</p>
          <div className="admin-response"><b>Admin Response:</b> Issues are fixed.</div>
        </div>

        <div className="feedback" data-status="NEW">
          <strong>Sneha (0268)</strong>
          <span className="tags status"><span>NEW</span><span>SUGGESTION</span></span>
          <p>Lunch - 02-09-2025 <span className="stars">&#9733;&#9733;&#9733;&#9733;</span></p>
          <p>Good variety. More South Indian options?</p>
          <div className="buttons">
            <button className="reviewBtn"><i className="fa-solid fa-check"></i> Mark as Reviewed</button>
            <button className="replyBtn"><i className="fa-solid fa-reply"></i> Respond</button>
          </div>
        </div>

        <div className="feedback" data-status="REVIEWED">
          <strong>Arjun (0356)</strong>
          <span className="tags status"><span>REVIEWED</span><span>COMPLAINT</span></span>
          <p>Breakfast - 01-09-2025 <span className="stars">&#9733;&#9733;</span></p>
          <p>Bread was stale and tea too sweet.</p>
          <div className="buttons"><button className="replyBtn"><i className="fa-solid fa-reply"></i> Respond</button></div>
        </div>
      </div>
    </div>
  );
}
