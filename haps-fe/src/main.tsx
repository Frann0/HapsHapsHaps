import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { store, StoreContext } from "./stores/store.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,
);
