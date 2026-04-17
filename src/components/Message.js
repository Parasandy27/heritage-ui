import React from "react";


function Message({ msg }) {
  return (
    <div className={`message ${msg.sender}`}>
      <div className="bubble">

        {/* ✅ TRIP UI */}
        {msg.isTrip && msg.text?.days ? (
          <div className="trip-container">

            {/* Travel Mode */}
            {msg.text.travel_mode && (
              <div className="travel-mode">
                🚆 {msg.text.travel_mode}
              </div>
            )}

            {/* Days */}
            {msg.text.days.map((day, i) => (
              <div key={i} className="trip-card">
                <h3>Day {i + 1}</h3>

                {day.activities?.map((act, j) => (
                  <div key={j} className="activity">
                    <p>📍 {act.place}</p>
                    <p>⏰ {act.time}</p>
                    <p>✨ {act.description}</p>
                  </div>
                ))}
              </div>
            ))}

            {/* ✅ Budget ONLY if exists */}
            {msg.text.budget && (
              <div className="budget-card">
                <h4>💰 Budget</h4>
                <p>Stay: {msg.text.budget.stay}</p>
                <p>Food: {msg.text.budget.food}</p>
                <p>Travel: {msg.text.budget.travel}</p>
                <p>Total: {msg.text.budget.total}</p>
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