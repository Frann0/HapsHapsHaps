import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import "./LandingPage.scss";
import Input from "../../components/shared/input/input";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [snaps, setSnaps] = useState("");
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
    console.log(username, snaps);
    if (username === "" || snaps === "") return;

    socketStore.sendMessage(JSON.stringify(join));
    navigate("/lobby");
  };

  return (
    <div className="Landing">
      <div className="Landing_Wrapper">
        <div>logo</div>
        <div className="Landing_Inputs">
          <Input
            placeholder="Navn"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Snaps"
            type="text"
            value={snaps}
            onChange={(e) => setSnaps(e.target.value)}
          />
        </div>
        <button className="Landing_Button" onClick={() => handleJoin()}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default observer(LandingPage);
