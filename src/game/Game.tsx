import Phaser from "phaser";
import { useEffect, useRef } from "react";
import GameScene from "./scenes/GameScene";
import WinScene from "./scenes/WinScene";

const Game = () => {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const game = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (parentDivRef.current) {
      game.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: parentDivRef.current,
        scene: [GameScene, WinScene],
        scale: {
          mode: Phaser.Scale.FIT, // Resize game to fit screen
          autoCenter: Phaser.Scale.CENTER_BOTH, // Center game
          width: 1920,
          height: 1080,
        },
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 0 },
          },
        },
        zoom: 1,
        backgroundColor: "#333339",
      });
    }
  }, []);

  return (
    <>
      <div
        ref={parentDivRef}
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      ></div>
    </>
  );
};

export default Game;
