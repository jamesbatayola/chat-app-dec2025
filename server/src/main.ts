import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";

import k from "kleur";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./interface/websocket.ts";

dotenv.config();

const PORT = process.env.SERVER_PORT as string;

const app = express();

app.use(cors());

const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  socket.emit("serverMsg", { msg: "WELCOME!!!", room: socket.id });

  socket.on("globalClientMsg", (payload) => {
    socket.broadcast.emit("globalServerMsg", {
      msg: payload.msg,
      room: payload.room,
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${k.bgYellow(PORT)}`);
});
