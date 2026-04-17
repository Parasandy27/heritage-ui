import React from "react";

function Message({ msg }) {
  return (
    <div className={`message ${msg.sender}`}>
      <div className="bubble">

        {/* Trip UI */}
        {msg.isTrip && msg.text?.days ? (
          <div className="trip-container">

            {/* 📅 DAYS */}
            {msg.text.days.map((day, i) => (
              <div key={i} className="trip-card">
                <h3>Day {day.day} - {day.title}</h3>
                <ul>
                  {day.activities.map((act, j) => (
                    <li key={j}>{act}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 🚗 TRAVEL */}
            {msg.text.travel_mode && (
              <div className="travel-card">
                <h3>🚗 Travel</h3>
                <p>{msg.text.travel_mode}</p>
              </div>
            )}

            {/* 💰 BUDGET */}
            {msg.text.budget && (
              <div className="budget-card">
                <h3>💰 Budget</h3>
                <p>Stay: {msg.text.budget.stay}</p>
                <p>Food: {msg.text.budget.food}</p>
                <p>Travel: {msg.text.budget.travel}</p>
                <p><b>Total: {msg.text.budget.total}</b></p>
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