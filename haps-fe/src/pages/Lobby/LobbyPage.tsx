import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import LobbyPlayer from "../../components/LobbyPlayer/LobbyPlayer";
import "./LobbyPage.scss";

const LobbyPage = () => {
  const { lobbyStore, socketStore } = useStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log(lobbyStore.players);
  }, []);

  const handleReady = () => {
    setReady(!ready);

    const r = {
      type: "ready",
      ready: ready,
    };

    socketStore.sendMessage(JSON.stringify(r));
  };
  return (
    <div className="Lobby">
      <div className="Lobby_Wrapper">
        {socketStore.connected && (
          <>
            {lobbyStore.players.map((p) => (
              <LobbyPlayer player={p} />
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
