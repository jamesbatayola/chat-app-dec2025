import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

type Message = {
  msg: string;
  room: string;
};

export function useChat() {
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setSocketId(socket.id ?? "");
    });

    socket.on("globalServerMsg", (payload) => {
      setMessages((prev) => [...prev, payload]);
    });

    return () => {
      socket.off("connect");
      socket.off("globalServerMsg");
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg: string) => {
    if (!msg.trim()) return;

    const payload = {
      msg,
      room: socket.id as string,
    };

    setMessages((prev) => [...prev, payload]);
    socket.emit("globalClientMsg", payload);
  };

  return {
    socketId,
    messages,
    sendMessage,
  };
}
