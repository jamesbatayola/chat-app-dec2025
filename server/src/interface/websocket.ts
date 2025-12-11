// /interface

export interface ServerToClientEvents {
  serverMsg: (data: { msg: string; room: string }) => void;
  globalServerMsg: (data: { msg: string; room: string }) => void;
}

export interface ClientToServerEvents {
  clientMsg: (data: { msg: string; room: string }) => void;
  globalClientMsg: (data: { msg: string; room: string }) => void;
}
