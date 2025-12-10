import { observer } from "mobx-react-lite";
import type { Player } from "../../interfaces/Player";
import "./LobbyPlayer.scss";

const LobbyPlayer = ({ player }: { player: Player }) => {
  return (
    <div className={`Player ${player.ready ? "Ready" : ""}`}>
      <p className="Player_Name">{player.username}</p>
      <p className="Player_Snaps">{player.snaps}</p>
    </div>
  );
};

export default observer(LobbyPlayer);
