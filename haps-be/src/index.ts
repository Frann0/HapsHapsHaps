import { Elysia, t } from "elysia";
import { randomUUIDv7 } from "bun";
import { Player, PlayerPublic } from "./interfaces/User";
import {
  broadcast,
  checkAllReady,
  getPublicPlayers,
  players,
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
          broadcast({ type: "test", msg });
          break;
        }

        case "join": {
          const newPlayer: Player = {
            id: ws.data.id,
            username: msg.username,
            snaps: msg.snaps,
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
            // later: start tournament here
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
