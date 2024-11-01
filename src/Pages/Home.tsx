import { AutoComplete, Button } from "antd";
import "./Home.scss";
import { Definitions } from "../definitions";
import { getTopScores, ScoreDoc } from "../db";
import { useEffect, useState } from "react";
import TopTable from "./Table";
import { stringifyTime } from "../game/utils";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [topScores, setTopScores] = useState<ScoreDoc[]>([]);

  const [name, setName] = useState<string | null>(localStorage.getItem("name"));

  useEffect(() => {
    getTopScores().then((scores) => setTopScores(scores));
  }, []);

  const handleNameChange = (name: string) => {
    if (!name) {
      setName(null);
      return;
    }

    if (!Definitions.db.teamMembers.includes(name)) {
      setName(Definitions.db.otherTeamMemeber);
      return;
    }

    setName(name);
  };

  const getNameTitle = () => {
    return (
      "משחקים בתור: " +
      name +
      (name == Definitions.db.otherTeamMemeber ? " (לא חבר קבוצה)" : "")
    );
  };

  const handleStartGame = () => {
    if (!name) {
      return;
    }

    localStorage.setItem("name", name);

    navigate("/game");
  };

  return (
    <div className="home">
      <div className="home__columns">
        <div className="home__columns--column">
          <h1 className="home__title">היכל התהילה</h1>
          <TopTable
            data={topScores}
            columns={[
              {
                title: "Score",
                dataIndex: "score",
                render: (text) => stringifyTime(text),
              },
              { title: "Name", dataIndex: "name" },
            ]}
          />
        </div>

        <div className="home__columns--column">
          <h1 className="home__title">מהו שמך?</h1>

          <AutoComplete
            allowClear
            style={{ width: "100%" }}
            placeholder="אנא הכנס את שמך"
            options={Definitions.db.teamMembers.map((name) => ({
              value: name,
            }))}
            defaultValue={localStorage.getItem("name")}
            onChange={handleNameChange}
          />

          {name && getNameTitle()}
        </div>

        <div className="home__columns--column">
          <h1 className="home__title">הפורשים הגדולים</h1>
          כרגע ריק אבל מבטיחים שיהיה פה משהו!
        </div>
      </div>

      <Button
        color={name ? "primary" : "primary"}
        variant="filled"
        style={{
          width: "50%",
        }}
        disabled={!name}
        onClick={handleStartGame}
      >
        התחל משחק
      </Button>
    </div>
  );
};

export default Home;
