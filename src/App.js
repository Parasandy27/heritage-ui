import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import InputArea from "./components/InputArea";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      { text: "Hello 👋 How can I help you?", sender: "bot" }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app">
      <Navbar />

      <div className="body">
        <Sidebar />

        <div className="chat-container">
          <ChatBox messages={messages} chatEndRef={chatEndRef} />
          <InputArea setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
}

export default App;