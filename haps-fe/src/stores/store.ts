import { createContext, useContext } from "react";
import { SocketStore } from "./socketStore";
import { LobbyStore } from "./lobbyStore";

export class RootStore {
  socketStore: SocketStore;
  lobbyStore: LobbyStore;

  constructor() {
    this.socketStore = new SocketStore(this);
    this.lobbyStore = new LobbyStore(this);
  }
}

export const store = new RootStore();
export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
