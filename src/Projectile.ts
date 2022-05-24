import { Sprite } from "pixi.js";

export class Projectile {
    readonly sprite: Sprite;
    private speed: number = 4;
    constructor(sprite: Sprite, startingPosX: number, startingPosY: number) {
        this.sprite = sprite;
        this.sprite.anchor.set(0, 0.5);
        this.sprite.position.set(startingPosX, startingPosY);
    }

    update(frameCount: number) {
        this.sprite.position.x += this.speed * frameCount;
    }
}