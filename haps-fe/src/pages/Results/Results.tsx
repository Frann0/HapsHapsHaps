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
    <div className="Results">
      <div className="Results_Container">
        {gameStore.finalResults.map((p, index) => (
          <div className="Results_Container_Result">
            <div className="Results_Container_Result_Rank">
              <h1 className="Results_Container_Result_Rank_Text">
                #{index + 1}
              </h1>
            </div>
            <div className="Results_Container_Result_Info">
              <p className="Results_Container_Result_Info_Name">
                {p.owner_name}
              </p>
              <p className="Results_Container_Result_Info_Snaps">{p.name}</p>
            </div>
            <div className="Results_Container_Result_Point">
              <p className="Results_Container_Result_Point_Text">Point</p>
              <p className="Results_Container_Result_Point_Score">{p.total}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="Results_Button" onClick={handleNavigate}>
        Git gud noobs
      </button>
    </div>
  );
};

export default observer(Results);
