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
        console.log(msg.players);
        this.root.lobbyStore.setPlayers(msg.players);
        break;

      case "allReady":
        this.root.lobbyStore.allReady = true;
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
