import { Elysia, t } from "elysia";
import { randomUUIDv7 } from "bun";
import { Player, PlayerPublic, Snaps } from "./interfaces/User";
import {
  broadcast,
  checkAllReady,
  checkAllVoted,
  currentRoundIndex,
  endGame,
  getPublicPlayers,
  nextRound,
  players,
  rounds,
  snapsList,
  startGame,
  votes,
} from "./helpers/helpers";

const app = new Elysia()
  .ws("/ws", {
    open(ws) {
      const id = randomUUIDv7();
      ws.data.id = id;
    },

    close(ws) {
      const idx = players.findIndex((p) => p.id === ws.data.id);

      if (idx !== -1) {
        players.splice(idx, 1);
        broadcast({ type: "lobbyUpdate", players: getPublicPlayers() });
      }
    },

    message(ws, msg: any) {
      switch (msg.type) {
        case "test": {
          broadcast({ type: "test", info: { snapsList, players } });
          break;
        }

        case "join": {
          let snapsObj: Snaps | null = null;

          if (msg.snaps !== null) {
            snapsObj = {
              id: randomUUIDv7(),
              owner: ws.data.id,
              owner_name: msg.username,
              name: msg.snaps,
            };

            snapsList.push(snapsObj);
          }

          const newPlayer: Player = {
            id: ws.data.id,
            username: msg.username,
            snaps: snapsObj,
            ready: false,
            ws,
          };

          if (players.find((p) => p.id === ws.data.id)) return;
          players.push(newPlayer);

          broadcast({ type: "lobbyUpdate", players: getPublicPlayers() });
          break;
        }

        case "ready": {
          const player = players.find((p) => p.id === ws.data.id);
          if (!player) return;

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

          break;
        }

        case "vote": {
          const playerId = ws.data.id;
          const snaps = rounds[currentRoundIndex];
          const snapsId = snaps.id;

          votes[playerId][snapsId] = msg.score;

          if (checkAllVoted()) {
            const continued = nextRound();

            if (!continued) {
              endGame();
            }
          }

          break;
        }
      }
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
