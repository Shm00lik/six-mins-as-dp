import { useState } from "react";
import "./App.css";
import Game from "./game/Game";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ height: "100vh", overflow: "hidden" }}>
            <Game></Game>
        </div>
    );
}

export default App;
