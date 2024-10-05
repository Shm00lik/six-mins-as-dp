import { Definitions, GridCell } from "../definitions";

class MainScene extends Phaser.Scene {
    ball?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    grid?: Phaser.Physics.Arcade.StaticGroup;
    shooterLeg?: Phaser.GameObjects.Sprite;
    isShooting: boolean = false;

    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("ball", Definitions.ball.path);
        this.load.image("shooter", Definitions.shooter.body.path);
        this.load.image("shooterLeg", Definitions.shooter.leg.path);
    }

    create() {
        this.createGrid();
        this.createBall();
        this.createShooter();

        this.input.on("pointerdown", () => {
            this.kickAnimation();
        });
    }

    private createGrid() {
        this.grid = this.physics.add.staticGroup();

        const cellWidth = this.game.canvas.width / Definitions.grid.cols;
        const cellHeight =
            (this.game.canvas.height / Definitions.grid.rows) *
            Definitions.grid.gridHeight;

        for (let i = 0; i < Definitions.grid.cols; i++) {
            for (let j = 0; j < Definitions.grid.rows; j++) {
                const x = i * cellWidth;
                const y = j * cellHeight;

                // Rectangle
                const rect = this.add
                    .rectangle(
                        x + cellWidth / 2,
                        y + cellHeight / 2,
                        cellWidth,
                        cellHeight,
                        Definitions.grid.cell.fillColor,
                        1
                    )
                    .setStrokeStyle(
                        Definitions.grid.cell.lineWidth,
                        Definitions.grid.cell.strokeColor
                    );

                // Text
                const text = this.add
                    .text(
                        x + cellWidth / 2,
                        y + cellHeight / 2,
                        Definitions.grid.rolesList[
                            Math.floor(
                                Math.random() *
                                    Definitions.grid.rolesList.length
                            )
                        ],
                        Definitions.grid.rolesTextStyle
                    )
                    .setOrigin(0.5, 0.5);

                this.grid.add(rect.setData("text", text));
            }
        }
    }

    private createBall() {
        this.ball = this.physics.add.image(1130, 920, "ball");
        this.ball.setDisplaySize(Definitions.ball.size, Definitions.ball.size);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);

        this.physics.add.collider(this.ball, this.grid!, this.onCollide);
    }

    private createShooter() {
        const shooterContainer = this.add.container(
            this.game.canvas.width / 2,
            this.game.canvas.height - 100
        );

        const shooter = this.add.sprite(0, 100, "shooter");
        shooter.setOrigin(0.5, 1);
        shooter.setScale(Definitions.shooter.body.scale);
        shooterContainer.add(shooter);

        const shooterLeg = this.add.sprite(-7, -53, "shooterLeg");
        shooterLeg.setOrigin(0, 0);
        shooterLeg.setScale(Definitions.shooter.leg.scale);
        shooterContainer.add(shooterLeg);

        this.shooterLeg = shooterLeg;
    }

    private kickAnimation() {
        this.tweens.add({
            targets: this.shooterLeg,
            angle: -60,
            duration: 100,
            yoyo: true,
            onStart: () => {
                this.isShooting = true;
            },
            onComplete: () => {
                this.isShooting = false;
            },

            onYoyo: () => {
                this.onPointerDown(this.input.activePointer);
            },
        });
    }

    private onCollide = (
        ball:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Tilemaps.Tile,
        cell:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Physics.Arcade.Body
            | Phaser.Tilemaps.Tile
    ) => {
        const rect = cell as Phaser.GameObjects.Rectangle;
        const cellRect = rect.getData("text") as Phaser.GameObjects.Text;

        rect.fillColor = Phaser.Display.Color.RandomRGB().color;

        rect.destroy();
        cellRect.destroy();
    };

    private onPointerDown = (pointer: Phaser.Input.Pointer) => {
        this.physics.velocityFromAngle(
            // Phaser.Math.Angle.Between(
            //     this.ball!.x,
            //     this.ball!.y,
            //     pointer.x,
            //     pointer.y
            // ),
            -60,
            1000,
            this.ball?.body.velocity
        );
    };
}

export default MainScene;
