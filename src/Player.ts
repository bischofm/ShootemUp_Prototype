import { Sprite } from "pixi.js";
import { SceneManager } from "./SceneManager";
import { GameScene } from "./Scenes/GameScene";

export class Player {

    readonly sprite: Sprite;
    private speed: number = 4;
    private horizontalMove: number = 0;
    private verticalMove: number = 0;
    private posX: number;
    private posY: number;

    private projectileOffsetX: number;
    private projectileOffsetY: number;
    private canShoot: boolean = true;
    private shootCooldown: number = 300;
    isAlive: boolean = true;
    readonly gameScene: GameScene;

    constructor(sprite: Sprite, startingPosX: number, startingPosY: number, gameScene: GameScene) {
        this.sprite = sprite;
        this.posX = startingPosX;
        this.posY = startingPosY;

        this.projectileOffsetX = sprite.width * 1.05;
        this.projectileOffsetY = sprite.height / 2;
        this.gameScene = gameScene;

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    private onKeyDown(e: KeyboardEvent) {
        if (e.key == "ArrowRight") {
            this.horizontalMove = this.speed;
        }
        if (e.key == "ArrowLeft") {
            this.horizontalMove = -this.speed;
        }
        if (e.key == "ArrowDown") {
            this.verticalMove = this.speed;
        }
        if (e.key == "ArrowUp") {
            this.verticalMove = -this.speed;
        }

        if (e.key == " ") {
            this.shoot();
        }
    }

    private onKeyUp(e: KeyboardEvent) {
        if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
            this.horizontalMove = 0;
        }
        if (e.key == "ArrowDown" || e.key == "ArrowUp") {
            this.verticalMove = 0;
        }
    }

    private shoot() {
        if (this.canShoot) {
            this.canShoot = false;
            this.gameScene.createProjectile(this.sprite.position.x + this.projectileOffsetX, this.sprite.position.y + this.projectileOffsetY);
            setTimeout(() => {
                this.canShoot = true;
            }, this.shootCooldown);
        }

    }

    public onCollision() {
        this.isAlive = false;
    }
    update(frameCount: number) {
        this.posX += this.horizontalMove * frameCount;
        if (this.posX < 0) {
            this.posX = 0;
        }
        else if (this.posX > SceneManager.width - this.sprite.width) {
            this.posX = SceneManager.width - this.sprite.width;
        }

        this.posY += this.verticalMove * frameCount;
        if (this.posY < 0) {
            this.posY = 0;
        }
        else if (this.posY > SceneManager.height - this.sprite.height) {
            this.posY = SceneManager.height - this.sprite.height;
        }

        this.sprite.position.set(this.posX, this.posY);
    }

}