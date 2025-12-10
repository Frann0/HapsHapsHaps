import { Player, Snaps } from "../interfaces/User";

export const players: Player[] = [];
export const snapsList: Snaps[] = [];

export const broadcast = (data: any) => {
  for (const p of players) {
    p.ws.send(JSON.stringify(data));
  }
};

export const getPublicPlayers = () => {
  return players.map((p) => ({
    id: p.id,
    username: p.username,
    snaps: p.snaps,
    ready: p.ready,
  }));
};

export const checkAllReady = () => {
  if (players.length === 0) return false;
  return players.every((p) => p.ready);
};
