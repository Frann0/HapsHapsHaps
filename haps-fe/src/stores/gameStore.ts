import { makeAutoObservable } from "mobx";
import type { RootStore } from "./store";
import type { Snaps } from "../interfaces/Player";
import type { Results, VotingStatus } from "../interfaces/Game";

export class GameStore {
  root: RootStore;
  currentRoundIndex: number = -1;
  currentSnaps: Snaps | null = null;
  submittedVote: number | null = null;
  hasSubmittedVote: boolean = false;
  gameStarted: boolean = false;
  gameEnded: boolean = false;
  votingStatus: VotingStatus[] = [];

  finalResults: Results[] = [];
  winner: Results | null = null;
  playerId: string | null = null;

  startRound(snaps: Snaps, roundIndex: number) {
    this.gameStarted = true;
    this.currentRoundIndex = roundIndex;
    this.currentSnaps = snaps;
    this.hasSubmittedVote = false;
  }

  submitVote(score: number) {
    this.submittedVote = score;
    this.root.socketStore.sendMessage(
      JSON.stringify({
        type: "vote",
        score,
      }),
    );
    this.hasSubmittedVote = true;
  }

  endGame(results: Results[], winner: Results) {
    this.finalResults = results;
    this.winner = winner;
    this.gameEnded = true;
  }

  resetGame() {
    this.currentRoundIndex = -1;
    this.currentSnaps = null;
    this.submittedVote = null;
    this.hasSubmittedVote = false;
    this.gameStarted = false;
    this.gameEnded = false;

    this.finalResults = [];
    this.winner = null;

    this.root.lobbyStore.players = [];
    this.root.lobbyStore.allReady = false;
    this.root.socketStore.disconnect();
    this.root.socketStore.createSocket();
  }

  setVotingStatus(list: VotingStatus[]) {
    const l = list.filter((p) => p.id !== this.playerId);
    console.log(l);
    this.votingStatus = l;
  }

  setPlayerId(id: string) {
    this.playerId = id;
  }

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }
}
