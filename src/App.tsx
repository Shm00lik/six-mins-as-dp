import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Game from "./game/Game";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <div style={{ backgroundColor: "#333339", position: "relative" }}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <div
          style={{
            position: "absolute",
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="/assets/logo.png" style={{ width: "75px" }} />
          קרדיט לטליה
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
