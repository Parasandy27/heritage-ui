import React from "react";
import Message from "./Message";
import "../styles/chatbox.css";

function ChatBox({ messages, chatEndRef }) {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <Message key={index} msg={msg} />
      ))}
      <div ref={chatEndRef}></div>
    </div>
  );
}

export default ChatBox;