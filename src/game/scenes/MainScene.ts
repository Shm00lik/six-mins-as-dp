import { Definitions } from "../definitions";

enum LookingDirection {
    Left = 0,
    Right = 1,
}
class MainScene extends Phaser.Scene {
    ball?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    grid?: Phaser.Physics.Arcade.StaticGroup;
    shooterContainer?: Phaser.GameObjects.Container;
    shooterLeg?: Phaser.GameObjects.Sprite;
    isShooting: boolean = false;
    isBallInAir: boolean = false;
    lookingDirection: LookingDirection = LookingDirection.Right;

    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("background", Definitions.background.path);
        this.load.image("ball", Definitions.ball.path);
        this.load.image("shooter", Definitions.shooter.body.path);
        this.load.image("shooterLeg", Definitions.shooter.leg.path);
    }

    create() {
        this.loadBackground();
        this.createGrid();
        this.createBall();
        this.createShooter();

        this.input.on("pointerdown", (point: any) => {
            this.onPointerDown(point);
        });

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            this.shooterContainer?.setPosition(
                pointer.x,
                this.shooterContainer.y
            );

            if (!this.isBallInAir)
                this.ball?.setPosition(
                    pointer.x + (this.lookingDirection ? 170 : -170),
                    this.ball.y
                );
        });
    }

    update() {
        if (this.ball?.body.blocked.down) {
            const randSide = Math.round(Math.random());

            if (randSide == LookingDirection.Left) {
                this.lookingDirection = LookingDirection.Left;
                this.shooterContainer?.setScale(-1, 1);
            } else {
                this.lookingDirection = LookingDirection.Right;
                this.shooterContainer?.setScale(1, 1);
            }

            this.resetBall();
        }

        // if (this.shooterContainer && ) {
        //     if (
        //         this.shooterContainer.x >= this.game.canvas.width / 2 + 300 &&
        //         this.lookingDirection === LookingDirection.Left
        //     ) {
        //         this.shooterContainer?.setScale(1, 1);
        //         this.lookingDirection = LookingDirection.Right;
        //     } else if (
        //         this.shooterContainer.x <= this.game.canvas.width / 2 - 300 &&
        //         this.lookingDirection === LookingDirection.Right
        //     ) {
        //         this.shooterContainer?.setScale(-1, 1);
        //         this.lookingDirection = LookingDirection.Left;
        //     }
        // }
    }

    private loadBackground() {
        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            "background"
        );
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
        this.setBallGlow(0xffdd1f);
        this.ball.setDisplaySize(Definitions.ball.size, Definitions.ball.size);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);

        this.physics.add.collider(this.ball, this.grid!, this.onCollide);
    }

    private setBallGlow(color: number) {
        this.ball?.clearFX();
        this.ball?.preFX?.addGlow(color);
    }

    private resetBall() {
        this.setBallGlow(0xffdd1f);
        this.ball?.setVelocity(0, 0);

        this.tweens.add({
            targets: this.ball,
            x: this.shooterContainer!.x + (this.lookingDirection ? 170 : -170),
            y: 920,
            duration: 100,
            onComplete: () => {
                this.isBallInAir = false;
            },
        });
    }

    private createShooter() {
        const shooterContainer = this.add.container(
            this.game.canvas.width / 2,
            this.game.canvas.height
        );

        const shooter = this.add.sprite(0, 0, "shooter");
        shooter.postFX?.addGlow(0xf5d409);
        shooter.setOrigin(0.5, 1);
        shooter.setScale(Definitions.shooter.body.scale);
        shooterContainer.add(shooter);

        const shooterLeg = this.add.sprite(-7, -170, "shooterLeg");
        shooterLeg.postFX?.addGlow(0xf5d409);
        shooterLeg.setOrigin(0, 0);
        shooterLeg.setScale(Definitions.shooter.leg.scale);
        shooterContainer.add(shooterLeg);

        this.shooterLeg = shooterLeg;
        this.shooterContainer = shooterContainer;
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
                this.shootBall();
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

        rect.destroy();
        cellRect.destroy();
    };

    private shootBall() {
        this.physics.velocityFromAngle(
            this.lookingDirection ? -60 : -120,
            1000,
            this.ball?.body.velocity
        );
        this.setBallGlow(0x00ff00);

        this.isBallInAir = true;
    }

    private onPointerDown = (pointer: Phaser.Input.Pointer) => {
        if (!this.isShooting && !this.isBallInAir) this.kickAnimation();
    };
}

export default MainScene;
