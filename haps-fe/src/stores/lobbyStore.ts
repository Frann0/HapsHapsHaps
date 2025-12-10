import { makeAutoObservable } from "mobx";
import type { RootStore } from "./store";
import type { Player } from "../interfaces/Player";

export class LobbyStore {
  root: RootStore;

  players: Array<Player> = [];

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
