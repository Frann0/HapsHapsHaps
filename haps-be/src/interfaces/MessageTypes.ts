import { PlayerPublic } from "./User";

export type ClientMessage =
  | { type: "join"; username: string; snap: string }
  | { type: "ready"; ready: boolean };

export type ServerMessage =
  | { type: "lobbyUpdate"; players: PlayerPublic[] }
  | { type: "allReady" };
