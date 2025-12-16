import { useState } from "react";
import { useChat } from "../hooks/useChat";
import "./Chat.css";

// COMPONENTS
import ChatInput from "../components/chat-input";
import ChatMessages from "../components/chat-messages";
import LogoutButton from "../components/logout-button";

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
        <ChatMessages messages={messages} socketId={socketId}></ChatMessages>

        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        ></ChatInput>

        <LogoutButton />
      </div>
    </div>
  );
}
