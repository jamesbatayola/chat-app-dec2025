import { io, Socket } from "socket.io-client";

type ServerToClientEvents = {
  serverMsg: (data: { msg: string; room: string }) => void;
  globalServerMsg: (data: { msg: string; room: string }) => void;
};

type ClientToServerEvents = {
  clientMsg: (data: { msg: string; room: string }) => void;
  globalClientMsg: (data: { msg: string; room: string }) => void;
};

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000"
);
