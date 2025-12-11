import { observer } from "mobx-react-lite";
import "./GamePage.scss";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import up from "../../assets/Up.svg";
import down from "../../assets/Down.svg";
import person from "../../assets/person.svg";
import bottle from "../../assets/bottle.svg";

import spinner from "../../assets/spinner.svg";
import check from "../../assets/check.svg";

const GamePage = () => {
  const { gameStore } = useStore();
  const [score, setScore] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameStore.gameEnded) {
      navigate("/results");
    }
  }, [gameStore.gameEnded]);

  const handleScore = (value: number) => {
    const MAX = 10;
    const MIN = 1;

    if (value > MAX) {
      setScore(MAX);
      return;
    }

    if (value < MIN) {
      setScore(MIN);
      return;
    }

    setScore(value);
  };

  const handleVote = () => {
    gameStore.submitVote(score);
    setScore(1);
  };

  const handleIncrease = () => {
    let t = score;
    t++;
    handleScore(t);
  };

  const handleDecrease = () => {
    let t = score;
    t--;
    handleScore(t);
  };

  return (
    <div className="Game">
      <h1 className="Game_Round">Runde {gameStore.currentRoundIndex + 1}</h1>
      {!gameStore.hasSubmittedVote && (
        <>
          {gameStore.currentSnaps && (
            <div className="Game_Snaps">
              <div className="Game_Snaps_Info">
                <img src={person} className="Game_Snaps_Info_Icon" />
                <p className="Game_Snaps_Info_Name">
                  {gameStore.currentSnaps.owner_name}
                </p>
              </div>
              <div className="Game_Snaps_Info">
                <img src={bottle} className="Game_Snaps_Info_Icon" />
                <p className="Game_Snaps_Info_Snaps">
                  {gameStore.currentSnaps.name}
                </p>
              </div>
            </div>
          )}
          <div className="Game_Number">
            <button className="Game_Number_Button_Top" onClick={handleIncrease}>
              <img src={up} className="Game_Number_Button_Top_Img" />
            </button>
            <div className="Game_Number_Input">
              <p className="Game_Number_Input_Text">{score}</p>
            </div>
            <button
              className="Game_Number_Button_Bottom"
              onClick={handleDecrease}
            >
              <img src={down} className="Game_Number_Button_Bottom_Img" />
            </button>
          </div>
          <button className="Game_Button" onClick={handleVote}>
            STEM!
          </button>
        </>
      )}

      {gameStore.hasSubmittedVote && (
        <>
          <div className="Game_Wait">
            <p className="Game_Wait_Text">Venter på dem der har tabt sutten!</p>

            <div className="Game_Wait_List">
              {gameStore.votingStatus
                .filter((p) => p.id !== gameStore.playerId)
                .map((p) => (
                  <div
                    className={`Game_Wait_Person ${p.hasVoted ? "HasVoted" : ""}`}
                  >
                    <p className="Game_Wait_Person_Name">{p.username}</p>
                    <img
                      src={p.hasVoted ? check : spinner}
                      className={`${p.hasVoted ? "icon_hasvoted" : "icon"}`}
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default observer(GamePage);
