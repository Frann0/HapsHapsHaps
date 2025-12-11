import { createContext, useContext } from "react";
import { SocketStore } from "./socketStore";
import { LobbyStore } from "./lobbyStore";
import { GameStore } from "./gameStore";

export class RootStore {
  socketStore: SocketStore;
  lobbyStore: LobbyStore;
  gameStore: GameStore;

  constructor() {
    this.socketStore = new SocketStore(this);
    this.lobbyStore = new LobbyStore(this);
    this.gameStore = new GameStore(this);
  }
}

export const store = new RootStore();
export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
