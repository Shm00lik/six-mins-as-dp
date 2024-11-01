import { AutoComplete, Button } from "antd";
import "./Home.scss";
import { Definitions } from "../definitions";
import { getTopScores, ScoreDoc } from "../db";
import { useEffect, useState } from "react";
import TopTable from "./Table";
import { stringifyTime } from "../game/utils";

const Home = () => {
  const [topScores, setTopScores] = useState<ScoreDoc[]>([]);

  const [name, setName] = useState<string | null>(null);

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
            onChange={handleNameChange}
          />

          {"משחקים בתור: " +
            name +
            (name == Definitions.db.otherTeamMemeber ? " (לא חבר קבוצה)" : "")}
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
      >
        התחל משחק
      </Button>
    </div>
  );
};

export default Home;
