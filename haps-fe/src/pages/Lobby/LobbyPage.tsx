import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import LobbyPlayer from "../../components/LobbyPlayer/LobbyPlayer";
import "./LobbyPage.scss";
import { useNavigate } from "react-router-dom";

const LobbyPage = () => {
  const { lobbyStore, socketStore, gameStore } = useStore();
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (socketStore.socket === null) {
      navigate("/");
    } else {
      if (lobbyStore.players) return;
      socketStore.sendMessage(
        JSON.stringify({
          type: "lobbyRestore",
        }),
      );
    }
  });

  const t = async () => {
    socketStore.createSocket();
  };

  useEffect(() => {
    if (gameStore.gameStarted) {
      navigate("/game");
    } else if (gameStore.gameEnded) {
      navigate("/results");
    }
  }, [gameStore.gameStarted, gameStore.gameEnded]);

  const handleReady = () => {
    let t = ready;
    t = !ready;
    setReady(t);

    const r = {
      type: "ready",
      ready: t,
    };

    socketStore.sendMessage(JSON.stringify(r));
  };
  return (
    <div className="Lobby">
      <div className="Lobby_Wrapper">
        {socketStore.connected && (
          <>
            {lobbyStore.players.map((p) => (
              <LobbyPlayer key={p.id} player={p} />
            ))}
          </>
        )}
      </div>
      <div className="Button_Container">
        <button
          className={`Button ${ready ? "Button_Ready" : ""}`}
          onClick={handleReady}
        >
          {ready ? "KLAR FOR SATAN!" : "IKKE KLAR FOR SATAN!"}
        </button>
      </div>
    </div>
  );
};

export default observer(LobbyPage);
