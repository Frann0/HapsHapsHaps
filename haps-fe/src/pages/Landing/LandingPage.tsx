import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import "./LandingPage.scss";
import Input from "../../components/shared/input/input";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/H3_Logo.svg";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [bringing, setBringing] = useState(false);
  const [snaps, setSnaps] = useState<string | null>(null);
  const { socketStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    socketStore.createSocket();
  }, []);

  const handleJoin = () => {
    const join = {
      type: "join",
      username,
      snaps,
    };
    if (username === "") return;

    socketStore.sendMessage(JSON.stringify(join));
    navigate("/lobby");
  };

  return (
    <div className="Landing">
      <div className="Landing_Wrapper">
        <div className="Landing_Logo">
          <img src={logo} className="Landing_Logo_Img" />
        </div>
        <div className="Landing_Inputs">
          <Input
            placeholder="Navn"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {bringing && (
            <Input
              placeholder="Snaps"
              type="text"
              value={snaps || ""}
              onChange={(e) => setSnaps(e.target.value)}
            />
          )}
          <div className="Landing_Check" onClick={() => setBringing(!bringing)}>
            <input
              className="Landing_Check_Input"
              type="checkbox"
              checked={bringing}
            ></input>

            <p className="Landing_Check_Text">Jeg har snaps med</p>
          </div>
        </div>
        <button className="Landing_Button" onClick={() => handleJoin()}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default observer(LandingPage);
