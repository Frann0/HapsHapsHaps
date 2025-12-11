import { makeAutoObservable } from "mobx";
import { createSocket } from "../services/socketService";
import type { RootStore } from "./store";

export class SocketStore {
  root: RootStore;
  socket: WebSocket | null = null;
  connected: boolean = false;

  createSocket() {
    this.socket = createSocket();

    this.socket.onopen = () => {
      this.connected = true;
    };

    this.socket.onclose = () => {
      this.connected = false;
    };

    this.socket.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      this.handleMessage(msg);
    };
  }

  handleMessage(msg: any) {
    switch (msg.type) {
      case "lobbyUpdate":
        this.root.lobbyStore.setPlayers(msg.players);
        break;

      case "allReady":
        this.root.lobbyStore.allReady = true;
        break;

      case "round_start":
        this.root.gameStore.startRound(msg.snaps, msg.roundIndex);
        break;

      case "game_end":
        this.root.gameStore.endGame(msg.results, msg.winner);
        break;

      case "votingStatus":
        this.root.gameStore.setVotingStatus(msg.players);
        break;

      case "playerId":
        this.root.gameStore.setPlayerId(msg.playerId);
        break;
    }
  }

  sendMessage(message: string) {
    this.socket?.send(message);
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }
}
