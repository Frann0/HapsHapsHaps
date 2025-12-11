import { Player, Snaps } from "../interfaces/User";

export const players: Player[] = [];
export const snapsList: Snaps[] = [];

export let rounds: Snaps[] = [];
export let currentRoundIndex = -1;

export const votes: Record<string, Record<string, number>> = {};

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

export const startGame = () => {
  rounds = snapsList.slice();
  currentRoundIndex = -1;

  for (const p of players) {
    votes[p.id] = {};
  }
};

export const nextRound = () => {
  currentRoundIndex++;
  if (currentRoundIndex >= rounds.length) {
    return false;
  }

  const snaps = rounds[currentRoundIndex];

  broadcast({
    type: "round_start",
    roundIndex: currentRoundIndex,
    snaps: {
      id: snaps.id,
      owner: snaps.owner,
      owner_name: snaps.owner_name,
      name: snaps.name,
    },
  });

  return true;
};

export const endGame = () => {
  const final = rounds.map((snaps) => {
    const snapsId = snaps.id;

    let total = 0;
    for (const p of players) {
      total += votes[p.id][snapsId] ?? 0;
    }

    return {
      snapsId,
      name: snaps.name,
      owner: snaps.owner,
      owner_name: snaps.owner_name,
      total,
    };
  });

  final.sort((a, b) => b.total - a.total);

  broadcast({
    type: "game_end",
    results: final,
    winner: final[0],
  });
  resetGame();
};

export const checkAllVoted = () => {
  const snaps = rounds[currentRoundIndex];
  const snapsId = snaps.id;

  return players.every((p) => votes[p.id][snapsId] !== undefined);
};

export const resetGame = () => {
  players.length = 0;
  snapsList.length = 0;
  rounds.length = 0;
  currentRoundIndex = -1;

  // clear all votes
  for (const playerId in votes) {
    delete votes[playerId];
  }
};

export const getVotingStatus = (snapsId: string, excludeId: string) => {
  return players.map((p) => {
    const playerVotes = votes[p.id] || {};
    return {
      id: p.id,
      username: p.username,
      hasVoted: playerVotes[snapsId] !== undefined,
    };
  });
};
