import React from "react";
import "../styles/message.css";

function Message({ msg }) {
  return (
    <div className={`message ${msg.sender}`}>
      <div className="bubble">

        {/* ✅ TRIP UI */}
        {msg.isTrip && msg.text?.days ? (
          <div className="trip-container">

            {/* 🚆 Travel Mode */}
            {msg.text.travel_mode && (
              <div className="travel-mode">
                🚆 {msg.text.travel_mode}
              </div>
            )}

            {/* 📅 Days */}
            {msg.text.days.map((day, i) => (
              <div key={i} className="trip-card">
                <h3>Day {i + 1}</h3>

                {/* Activities */}
                {day.activities?.length ? (
                  day.activities.map((act, j) => (
                    <div key={j} className="activity">
                      <p className="place">📍 {act.place || "N/A"}</p>
                      <p className="time">⏰ {act.time || "N/A"}</p>
                      <p className="desc">✨ {act.description || "N/A"}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No activities available</p>
                )}
              </div>
            ))}

            {/* 💰 Budget */}
            {msg.text.budget && (
              <div className="budget-card">
                <h4>💰 Budget</h4>
                <div className="budget-grid">
                  <p>🍛 Food: {msg.text.budget.food}</p>
                  <p>🚆 Travel: {msg.text.budget.travel}</p>
                  <p>🏨 Stay: {msg.text.budget.stay}</p>
                  <p className="total">💵 Total: {msg.text.budget.total}</p>
                </div>
              </div>
            )}

          </div>
        ) : (
          <p>{msg.text}</p>
        )}

      </div>
    </div>
  );
}

export default Message;