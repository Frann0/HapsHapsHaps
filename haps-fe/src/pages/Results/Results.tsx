import { observer } from "mobx-react-lite";
import "./Results.scss";
import { useStore } from "../../stores/store";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { gameStore } = useStore();
  const navigate = useNavigate();

  const handleNavigate = () => {
    gameStore.resetGame();
    navigate("/");
  };

  return (
    <div>
      {gameStore.finalResults.map((p) => (
        <>
          <p>
            {p.name} - {p.owner_name} - {p.total}
          </p>
        </>
      ))}
      <button onClick={handleNavigate}>Hjem</button>
    </div>
  );
};

export default observer(Results);
