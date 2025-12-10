import { observer } from "mobx-react-lite";
import type { Player } from "../../interfaces/Player";
import "./LobbyPlayer.scss";
import bottle from "../../assets/bottle.svg";
import person from "../../assets/person.svg";

const LobbyPlayer = ({ player }: { player: Player }) => {
  return (
    <div className={`Player ${player.ready ? "Ready" : ""}`}>
      <div className="Player_Info">
        <img src={person} className="Player_Icon" />
        <p className="Player_Name">{player.username}</p>
      </div>
      {player.snaps && (
        <div className="Player_Info">
          <img src={bottle} className="Player_Icon" />
          <p className="Player_Snaps">{player.snaps.name}</p>
        </div>
      )}
    </div>
  );
};

export default observer(LobbyPlayer);
