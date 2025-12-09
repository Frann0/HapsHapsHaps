import LandingPage from "../pages/Landing/LandingPage";
import LobbyPage from "../pages/Lobby/LobbyPage";
import { LobbyStore } from "../stores/lobbyStore";
import type { Route } from "./Route";

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
];
