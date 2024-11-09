import { Button } from "antd";
import "./Tutorial.scss";
import { useNavigate } from "react-router-dom";

const Tutorial = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <div className="tutorial">
      <img
        src="/assets/tutorial.png"
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      <Button
        variant="filled"
        className="tutorial__button"
        onClick={handleStartGame}
      >
        התחל משחק
      </Button>
    </div>
  );
};

export default Tutorial;
