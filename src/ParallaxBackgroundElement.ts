import { Texture, TilingSprite } from "pixi.js";

export class ParallaxBackgroundElement extends TilingSprite {
    speed: number;

    constructor(texture: Texture, posX: number, posY: number, speed: number) {
        super(texture, texture.width, texture.height);
        this.position.x = posX;
        this.position.y = posY;
        this.speed = speed;
    }
    update(frameCount: number) {
        this.tilePosition.x -= this.speed * frameCount;
    }
}