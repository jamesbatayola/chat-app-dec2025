import { useState } from "react";
import { useChat } from "./hooks/useChat";
import "./App.css";

export default function App() {
  const { socketId, messages, sendMessage } = useChat(); // INITIALIZE WEB SOCKET CONNECTION
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="app-wrapper">
      <div className="chat-container">
        <div className="messages-area">
          {messages.length === 0 && (
            <p className="placeholder">No messages yet...</p>
          )}

          {messages.map((msg, ind) => (
            <div
              key={ind}
              className={
                msg.room === socketId ? "chat-bubble-you" : "chat-bubble-sender"
              }
            >
              <p>{msg.msg}</p>
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput((prev) => e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}
