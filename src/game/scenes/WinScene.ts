import { Definitions } from "../definitions";
import { stringifyTime } from "../utils";

class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: "WinScene" });
  }

  init(data: any) {
    this.registry.set("time", data.time);
  }

  preload() {
    this.load.video("vassilyVideo", Definitions.win.video.path);
    this.load.audio("rizz", Definitions.win.audio.path);
  }

  create() {
    this.sound
      .add("rizz")
      .setRate(1.35)
      .addListener("complete", () => {
        this.scene.start("MainScene");
      })
      .play();

    this.add
      .video(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "vassilyVideo"
      )
      .setMute(true)
      .play(true);

    this.add
      .text(
        0,
        0,
        stringifyTime(this.registry.get("time")),
        Definitions.win.textStle
      )
      .setOrigin(0.5)
      .setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2);
  }
}

export default WinScene;
