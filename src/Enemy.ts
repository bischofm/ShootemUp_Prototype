import { Sprite } from "pixi.js";
import { SceneManager } from "./SceneManager";

export class Enemy {
    speed: number = 1;
    sprite: Sprite;
    moveDirectionX: number = 0;
    moveDirectionY: number = 0;
    moveTimer: number = 2500;

    constructor(sprite: Sprite, startingPosX: number, startingPosY: number) {
        this.sprite = sprite;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(startingPosX, startingPosY);
        this.getRandomDirection();
        setInterval(() => this.getRandomDirection(), this.moveTimer);
    }
    //Sets a random movement direction
    //moveDirectionX will always be non-negative
    private getRandomDirection() {
        let dirX = Math.random();
        let dirY = Math.sqrt(1 - Math.pow(dirX, 2));
        let sign = Math.random() < 0.5 ? -1 : 1;
        dirY *= sign;
        let destinationY = this.sprite.position.y + dirY * this.speed * this.moveTimer * 60 / 1000;
        if (destinationY < this.sprite.height || destinationY > SceneManager.height - this.sprite.height) {
            this.getRandomDirection();
        }
        else {
            this.moveDirectionX = dirX;
            this.moveDirectionY = dirY;
        }
    }

    update(frameCount: number) {
        this.sprite.position.x -= this.moveDirectionX * this.speed * frameCount;
        this.sprite.position.y += this.moveDirectionY * this.speed * frameCount;
    }
}