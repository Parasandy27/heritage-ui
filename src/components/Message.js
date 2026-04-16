import React from "react";

function Message({ msg }) {
  return (
    <div className={`message ${msg.sender}`}>

      {/* ✅ Trip UI */}
      {msg.isTrip && msg.text?.days ? (
        <div className="trip-container">
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
        </div>
      ) : (
        <p>{msg.text}</p>
      )}

    </div>
  );
}

export default Message;