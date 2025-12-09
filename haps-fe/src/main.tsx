import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { store, StoreContext } from "./stores/store.ts";

createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
);
