import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";

import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./interface/websocket.ts";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000"
);

socket.on("connect", () => {
  socket.on("serverMsg", (payload) => {
    console.log(payload.msg);
  });
});

export default function App() {
  const [socketId, setSocketId] = useState<string>("");
  const [message, setMessage] = useState<{ msg: string; room: string }>();
  const [messages, setMessages] = useState<{ msg: string; room: string }[]>([]);

  useEffect(() => {
    socket.on("serverMsg", (p) => {
      setSocketId(p.room);
    });

    socket.on("globalServerMsg", (payload) => {
      const serverMsg = payload;
      setMessages((prev) => [...prev, serverMsg]);
    });

    return () => {
      socket.off("globalServerMsg");
    };
  }, []);

  const handleSend = () => {
    if (message!.msg === "") return;
    setMessages((prev) => [...prev, message!]);

    socket.emit("globalClientMsg", {
      msg: message?.msg as string,
      room: socket.id as string,
    });
  };

  return (
    <div className="app-wrapper">
      <div className="chat-container">
        <div className="messages-area">
          {messages.length === 0 && (
            <p className="placeholder">No messages yet...</p>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className="chat-bubble">
              <p>From {msg.room}</p>
              <p>{msg.msg}</p>
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={message?.msg || ""}
            onChange={(e) =>
              setMessage((prev) => {
                return { msg: e.target.value, room: socketId };
              })
            }
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}
