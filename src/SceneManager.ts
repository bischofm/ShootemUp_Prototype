import { Application } from "pixi.js";
import { IScene } from "./Interfaces/IScene";

export class SceneManager {
    private constructor() { };

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    public static get width(): number {
        return SceneManager._width;
    }

    private static _height: number;
    public static get height(): number {
        return SceneManager._height;
    }
    private static isInitialized: boolean = false;

    public static initialize(width: number, height: number) {
        if (SceneManager.isInitialized) {
            console.log("SceneManager already intialized!");
            return;
        }

        SceneManager.isInitialized = true;
        SceneManager._width = width;
        SceneManager._height = height;

        SceneManager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x2a2a34,
            width: width,
            height: height
        });
        SceneManager.app.ticker.add(SceneManager.update);
    }

    public static changeScene(newScene: IScene) {
        if (SceneManager.currentScene) {
            SceneManager.app.stage.removeChild(SceneManager.currentScene);
            SceneManager.currentScene.destroy();
        }
        SceneManager.currentScene = newScene;
        SceneManager.app.stage.addChild(SceneManager.currentScene);
    }

    private static update(frameCount: number) {
        if (SceneManager.currentScene) {
            SceneManager.currentScene.update(frameCount);
        }
    }
}