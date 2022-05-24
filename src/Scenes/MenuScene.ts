import { Container, Loader, Sprite } from "pixi.js";
import { IScene } from "../Interfaces/IScene";
import { Text } from "pixi.js";
import { SceneManager } from "../SceneManager";
import { GameScene } from "./GameScene";

export class MenuScene extends Container implements IScene {
    constructor() {
        super();

        let background = Sprite.from("background_far");
        background.position.set(0, 0);
        this.addChild(background);
        let animation = Loader.shared.resources["menu_animation"].animation;
        if (animation != undefined) {
            animation.position.set(0, 100);
            this.addChild(animation);
        }

        let textList = ["GAME1", "GAME2", "GAME3", "EXIT"];
        for (let i = 0; i < textList.length; i++) {
            let text = new Text(textList[i]);
            text.anchor.set(0.5, 0.5);
            text.position.set(SceneManager.width / 2, SceneManager.height / 2 + i * 60);
            text.style.fill = 0xffffff;
            this.addChild(text);
            text.interactive = true;
            if (textList[i] == "EXIT") {
                text.on("click", () => { window.location.href = 'https://pixijs.download/dev/docs/index.html'; })
            }
            else {
                text.on("click", () => { SceneManager.changeScene(new GameScene()); })
            }
        }
        let logo = Sprite.from("logo");
        logo.anchor.set(0.5, 0.5);
        logo.position.set(SceneManager.width / 2, SceneManager.height / 4);
        this.addChild(logo);
    }
    update(_frameCount: number) {

    }
}