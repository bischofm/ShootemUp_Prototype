import { DisplayObject } from "pixi.js";

/**Check if the bounding boxes of two objects overlap or touch*/
export function checkCollision(objA: DisplayObject, objB: DisplayObject): boolean {
    const a = objA.getBounds();
    const b = objB.getBounds();
    return !(
        a.right < b.left ||
        a.left > b.right ||
        a.top > b.bottom ||
        a.bottom < b.top)
}