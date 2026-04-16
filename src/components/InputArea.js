import React, { useState } from "react";
import "../styles/input.css";

function InputArea({ setMessages }) {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { text: "Typing...", sender: "bot", typing: true }
    ]);

    try {
const res = await fetch("https://endurance-delta-viscous.ngrok-free.dev/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: currentInput
  })
});
      const data = await res.json();

      setMessages((prev) => prev.filter((m) => !m.typing));

      setMessages((prev) => [
        ...prev,
        { text: data.reply, sender: "bot" }
      ]);

    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to backend", sender: "bot" }
      ]);
    }
  };

  return (
    <div className="input-area">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about places..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>➤</button>
    </div>
  );
}

export default InputArea;