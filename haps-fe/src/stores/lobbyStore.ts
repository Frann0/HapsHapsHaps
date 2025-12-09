import { makeAutoObservable } from "mobx";
import type { RootStore } from "./store";

export class LobbyStore {
  root: RootStore;

  players: Array<{
    id: string;
    username: string;
    snap: string;
    ready: boolean;
  }> = [];

  allReady = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setPlayers(players: typeof this.players) {
    this.players = players;
    this.allReady = players.length > 0 && players.every((p) => p.ready);
  }
}
