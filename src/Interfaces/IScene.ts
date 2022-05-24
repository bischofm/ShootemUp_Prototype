import { DisplayObject } from "pixi.js";

export interface IScene extends DisplayObject{
    update(frameCount: number): void;
}