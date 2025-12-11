import { makeAutoObservable } from "mobx";
import type { RootStore } from "./store";
import type { Player } from "../interfaces/Player";

export class LobbyStore {
  root: RootStore;

  players: Player[] = [];

  allReady = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  setPlayers(players: Player[]) {
    console.log(players);
    this.players = players;
    this.allReady = players.length > 0 && players.every((p) => p.ready);
  }

  findPlayerById(id: string) {
    return this.players.find((p) => p.id === id);
  }
}
