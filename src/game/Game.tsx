import Phaser from "phaser";
import { useEffect, useRef } from "react";

const Game = () => {
    const parentDivRef = useRef<HTMLDivElement>(null);
    const game = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (parentDivRef.current) {
            game.current = new Phaser.Game({
                type: Phaser.AUTO,
                parent: parentDivRef.current,
                scene: {
                    preload: function () {
                        this.load.image("logo", "assets/react.svg");
                    },
                    create: function () {
                        this.add.image(100, 0, "logo");
                    },
                },
                scale: {
                    autoCenter: Phaser.Scale.CENTER_BOTH, // Center game
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                autoRound: true,
            });
        }

        const resizeGame = () => {
            console.log(game.current);
            if (game.current) {
                game.current.scale.resize(
                    window.innerWidth,
                    window.innerHeight
                );
            }
        };

        window.addEventListener("resize", resizeGame);

        return () => {
            window.removeEventListener("resize", resizeGame);
            if (game.current) {
                game.current.destroy(true);
            }
        };
    }, []);

    const toggleFullscreen = () => {
        const element = document.documentElement;
        if (!document.fullscreenElement) {
            element.requestFullscreen().catch((err) => console.error(err));
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <>
            <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
            <div
                ref={parentDivRef}
                style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
            ></div>
        </>
    );
};

export default Game;
