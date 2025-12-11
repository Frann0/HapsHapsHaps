import LandingPage from "../pages/Landing/LandingPage";
import LobbyPage from "../pages/Lobby/LobbyPage";
import { LobbyStore } from "../stores/lobbyStore";
import type { Route } from "../interfaces/Route.ts";
import GamePage from "../pages/Game/GamePage.tsx";
import Results from "../pages/Results/Results.tsx";

export const DefaultRoutes: Route[] = [
  {
    path: "/",
    component: LandingPage,
    name: "Landing",
  },
  {
    path: "/Lobby",
    component: LobbyPage,
    name: "Lobby",
  },
  {
    path: "/game",
    component: GamePage,
    name: "game",
  },
  {
    path: "/results",
    component: Results,
    name: "results",
  },
];
