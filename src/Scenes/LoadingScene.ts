import { AnimatedGIFLoader } from "@pixi/gif";
import { Container, Loader, Sprite } from "pixi.js";
import { assets } from "../assets";
import { IScene } from "../Interfaces/IScene";
import { SceneManager } from "../SceneManager";
import { MenuScene } from "./MenuScene";

export class LoadingScene extends Container implements IScene {
    private splashArt: Sprite;
    constructor() {
        super();
        this.splashArt = Sprite.from('./loading_splash.png');
        this.splashArt.anchor.set(0.5, 0.5);
        this.splashArt.position.x = SceneManager.width / 2;
        this.splashArt.position.y = SceneManager.height / 2;
        this.addChild(this.splashArt);
        Loader.registerPlugin(AnimatedGIFLoader);
        Loader.shared.add(assets);
        Loader.shared.load();
        setTimeout(() => this.fadeOut(), 2000);
    }

    private fadeOut() {
        this.splashArt.alpha -= 1 / 100;
        if (this.splashArt.alpha > 0) {
            setTimeout(() => {
                this.fadeOut();
            }, 10);
        }
        else {
            this.goToMenu();
        }

    }

    private goToMenu() {
        SceneManager.changeScene(new MenuScene());
    }

    update(_frameCount: number) {

    }
}