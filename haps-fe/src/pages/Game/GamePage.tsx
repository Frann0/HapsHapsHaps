import { observer } from "mobx-react-lite";
import "./GamePage.scss";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import Input from "../../components/shared/input/input";
import { useNavigate } from "react-router-dom";

import up from "../../assets/Up.svg";
import down from "../../assets/Down.svg";

const GamePage = () => {
  const { socketStore, lobbyStore, gameStore } = useStore();
  const [score, setScore] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(gameStore.currentSnaps!.owner);

    lobbyStore.players.map((p) => console.log(p.id));
  }, []);

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
              <p>{gameStore.currentSnaps.owner_name}</p>
              <p>{gameStore.currentSnaps.name}</p>
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
          <button onClick={handleVote}>STEM!</button>
        </>
      )}
    </div>
  );
};

export default observer(GamePage);
