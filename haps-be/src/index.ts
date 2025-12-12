import { Elysia } from "elysia";
import { randomUUIDv7 } from "bun";
import { Player, Snaps } from "./interfaces/User";
import {
  broadcast,
  checkAllReady,
  checkAllVoted,
  currentRoundIndex,
  endGame,
  gameStarted,
  getPublicPlayers,
  getVotingStatus,
  nextRound,
  players,
  rounds,
  sessions,
  snapsList,
  startGame,
  votes,
} from "./helpers/helpers";

const app = new Elysia()
  .ws("/ws", {
    open(ws) {
      /**
      const id = randomUUIDv7();
      ws.data.id = id;
    */
      const clientId = ws.data.query.clientId;

      if (!clientId) {
        ws.send(JSON.stringify({ error: "No clientId provided" }));
        ws.close();
        return;
      }

      let session = sessions.get(clientId);
      if (!session) {
        session = {
          clientId,
          socket: ws,
          lobbyId: null,
          gameId: null,
          gameState: null,
        };
        sessions.set(clientId, session);
      } else {
        // reconnect and attach new socket
        session.socket = ws;
      }
      ws.data.session = session;

      // Attach socket to player if exists
      const existingPlayer = players.find((p) => p.id === clientId);
      if (existingPlayer) {
        existingPlayer.ws = ws;
      }

      // Restore game state for reconnect
      if (session.gameState) {
        ws.send(
          JSON.stringify({
            type: "restore_state",
            state: session.gameState,
          }),
        );
      }
    },

    close(ws) {
      const clientId = ws.data.query.clientId;
      /**
      const idx = players.findIndex((p) => p.id === clientId);

      if (idx !== -1) {
        players.splice(idx, 1);
        broadcast({ type: "lobbyUpdate", players: getPublicPlayers() });
      }
    */
    },

    message(ws, msg: any) {
      const session = ws.data.session;

      if (!session) return;

      const clientId = session.clientId;

      switch (msg.type) {
        case "test": {
          broadcast({ type: "test", info: { snapsList, players } });
          break;
        }

        case "join": {
          let snapsObj: Snaps | null = null;

          if (msg.snaps !== null) {
            snapsObj = {
              id: clientId,
              owner: clientId,
              owner_name: msg.username,
              name: msg.snaps,
            };

            snapsList.push(snapsObj);
          }

          /*

          const newPlayer: Player = {
            id: clientId,
            username: msg.username,
            snaps: snapsObj,
            ready: false,
            ws,
          };

          if (players.find((p) => p.id === clientId)) return;
          players.push(newPlayer);

          ws.send(
            JSON.stringify({
              type: "playerId",
              playerId: clientId,
            }),
          );

          broadcast({
            type: "lobbyUpdate",
            players: getPublicPlayers(),
          });
        */
          let player = players.find((p) => p.id === clientId);

          if (!player) {
            const newPlayer: Player = {
              id: clientId,
              username: msg.username,
              snaps: snapsObj,
              ready: false,
              ws,
            };
            players.push(newPlayer);
          } else {
            player.username = msg.username;
            player.ws = ws;

            if (!player.snaps) player.snaps = snapsObj;
          }

          ws.send(
            JSON.stringify({
              type: "playerId",
              playerId: clientId,
            }),
          );

          broadcast({
            type: "lobbyUpdate",
            players: getPublicPlayers(),
          });

          session.gameState = {
            ...session.gameState,
            ready: msg.ready,
            gameStarted,
            inLobby: true,
          };
          break;
        }

        case "lobbyRestore":
          broadcast({
            type: "lobbyUpdate",
            players: getPublicPlayers(),
          });
          break;

        case "ready": {
          const player = players.find((p) => p.id === clientId);
          if (!player) return;

          player.ready = msg.ready;

          session.gameState = {
            ...session.gameState,
            ready: msg.ready,
            gameStarted,
          };
          broadcast({ type: "lobbyUpdate", players: getPublicPlayers() });

          if (checkAllReady()) {
            broadcast({ type: "allReady" });
            startGame();

            for (let s of sessions.values()) {
              s.gameState = {
                ...s.gameState,
                gameStarted,
                inLobby: false,
              };
            }

            nextRound();
            // later: start tournament here
          }

          /*

          if (!msg.ready) {
            player.ready = false;

            broadcast({ type: "lobbyUpdate", players: getPublicPlayers() });
            return;
          }

          player.ready = msg.ready;

          broadcast({ type: "lobbyUpdate", players: getPublicPlayers() });

          if (checkAllReady()) {
            broadcast({ type: "allReady" });
            startGame();
            nextRound();
            // later: start tournament here
          }
*/
          break;
        }

        case "vote": {
          const snaps = rounds[currentRoundIndex];
          const snapsId = snaps.id;

          if (!votes[clientId]) votes[clientId] = {};

          votes[clientId][snapsId] = msg.score;

          session.gameState = {
            ...session.gameState,
            hasVoted: true,
            submittedVote: msg.score,
          };

          const statusList = getVotingStatus(snapsId, clientId);

          ws.send(
            JSON.stringify({
              type: "votingStatus",
              players: statusList,
            }),
          );

          if (checkAllVoted()) {
            const continued = nextRound();
            if (!continued) endGame();
          }

          /*
          const playerId = clientId;
          const snaps = rounds[currentRoundIndex];
          const snapsId = snaps.id;
          if (!votes[playerId]) votes[playerId] = {};
          votes[playerId][snapsId] = msg.score;

          const statusList = getVotingStatus(snapsId, playerId);

          // send only to this user
          broadcast({
            type: "votingStatus",
            players: statusList,
          });

          if (checkAllVoted()) {
            const continued = nextRound();

            if (!continued) {
              endGame();
            }
          }
*/
          break;
        }
      }
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
