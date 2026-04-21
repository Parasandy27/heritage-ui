import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello 👋 How can I help you?", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);

  // 🔥 AUTO SCROLL REF
  const messagesEndRef = useRef(null);

  // 🔥 AUTO SCROLL EFFECT
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // ✅ Add user message
    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://endurance-delta-viscous.ngrok-free.dev/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userText }),
        },
      );

      console.log("STATUS:", res.status);

      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json(); // ✅ ONLY ONCE
      console.log("DATA:", data);

      // 🔥 HANDLE BOTH CASES
      if (data.days) {
        setMessages((prev) => [...prev, { text: data, sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      }
    } catch (err) {
      console.error("ERROR:", err);

      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to backend", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      {/* 🔥 NAVBAR */}
      <Navbar />

      {/* 🔥 BODY */}
      <div className="body">
        {/* SIDEBAR */}
        <div className="sidebar">
          <h1>TRAVELMATE AI</h1>
          <p>Explore Culture IN</p>
        </div>

        {/* CHAT */}
        <div className="chat">
          {/* MESSAGES */}
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.sender}`}>
                <div className={`message ${msg.sender}`}>
                  {/* 🔥 TRIP UI */}
                  {msg.text?.days ? (
                    <div className="trip-wrapper">
                      {msg.text.days.map((day, index) => (
                        <div key={index} className="premium-day-card">
                          <div className="accent-line"></div>

                          <div className="day-content">
                            <h2>Day {day.day}</h2>
                            <p>{day.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ whiteSpace: "pre-line" }}>{msg.text}</div>
                  )}
                </div>
              </div>
            ))}

            {/* 🔥 LOADING */}
            {loading && (
              <div className="message-row bot">
                <div className="message bot typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* 🔥 AUTO SCROLL TARGET */}
            <div ref={messagesEndRef}></div>
          </div>

          {/* INPUT */}
          <div className="input-area">
            <input
              placeholder="Ask about places..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage} disabled={loading}>
              {loading ? "..." : "➤"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
