import React from "react";
import "../styles/tripcard.css";

function TripCard({ data }) {
  return (
    <div className="trip-container">
      {data.days?.map((day, i) => (
        <div key={i} className="day-card">
          <h2 className="day-title">Day {day.day}</h2>

          <p className="day-heading">{day.title}</p>

          <ul className="activity-list">
            {day.activities.map((act, j) => (
              <li key={j}>{act}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TripCard;