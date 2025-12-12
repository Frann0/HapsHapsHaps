import { Snaps } from "./User";

export interface Session {
  clientId: string;
  socket: any;
  lobbyId: string | null;
  gameId: string | null;
  gameState: {
    ready: boolean;
    gameStarted?: boolean;
    inLobby?: boolean;
    gameEnded?: boolean;
    currentRoundIndex?: number;
    currentSnaps?: Snaps;
    hasVoted?: boolean;
    submittedVote?: number;
  } | null;
}
