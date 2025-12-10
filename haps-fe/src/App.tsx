import { observer } from "mobx-react-lite";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { DefaultRoutes } from "./routes/DefaultRoutes";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          {DefaultRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </div>
    </>
  );
}

export default observer(App);

/**
 *
 *
 *
 *  <input
        type="text"
        placeholder="Navn"
        onChange={(e) => setNavn(e.target.value)}
      />
      <input
        type="text"
        placeholder="Snaps"
        onChange={(e) => setSnaps(e.target.value)}
      />
      <button
        onClick={() =>
          socketStore.socket?.send(
            JSON.stringify({
              type: "join",
              username: navn,
              snaps: snaps,
            }),
          )
        }
      >
        Connect
      </button>

      <button
        onClick={() => {
          socketStore.socket?.send(
            JSON.stringify({
              type: "ready",
              ready: true,
            }),
          );
        }}
      >
        Ready
      </button>

      <button onClick={() => socketStore.disconnect()}>disconnect</button>

      {socketStore.socket ? (
        <div style={{ color: "white" }}>
          <ul>
            {lobbyStore.players.map((p) => (
              <li key={p.id}>
                {p.username} –{" "}
                {p.ready ? (
                  <span style={{ color: "lightgreen" }}>Ready</span>
                ) : (
                  <span style={{ color: "red" }}>Not ready</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ color: "white" }}>not connected</div>
      )}

*/
