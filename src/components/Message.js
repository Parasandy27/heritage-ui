import React from "react";
import TripCard from "./TripCard";
import "../styles/message.css";

function Message({ msg }) {
  return (
    <div className={`msg ${msg.sender}`}>
      {typeof msg.text === "string" ? (
        msg.text
      ) : (
        <TripCard data={msg.text} />
      )}
    </div>
  );
}

export default Message;