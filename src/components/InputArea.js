import React, { useState } from "react";
import "../styles/input.css";

function InputArea({ setMessages }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { text: input, sender: "user" };

    // show user message
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    // show typing
    setMessages((prev) => [
      ...prev,
      { text: "Typing...", sender: "bot", typing: true }
    ]);

    try {
      const res = await fetch(
        "https://endurance-delta-viscous.ngrok-free.dev/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: currentInput
          })
        }
      );

      const data = await res.json();

      setMessages((prev) => {
        // remove typing
        const filtered = prev.filter((m) => !m.typing);

        // trip response
        if (data.days) {
          return [
            ...filtered,
            { text: data, sender: "bot", isTrip: true }
          ];
        }

        // normal response
        return [
          ...filtered,
          {
            text: data.reply || "No response",
            sender: "bot"
          }
        ];
      });

    } catch (error) {
      console.error(error);

      setMessages((prev) => {
        const filtered = prev.filter((m) => !m.typing);
        return [
          ...filtered,
          { text: "Error connecting to backend", sender: "bot" }
        ];
      });
    }

    setLoading(false);
  };

  return (
    <div className="input-area">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about places..."
        disabled={loading}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "..." : "➤"}
      </button>
    </div>
  );
}

export default InputArea;