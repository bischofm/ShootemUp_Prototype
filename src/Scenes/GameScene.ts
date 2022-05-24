import { Container, Sprite, Texture } from "pixi.js";
import { checkCollision } from "../Collision";
import { Enemy } from "../Enemy";
import { IScene } from "../Interfaces/IScene";
import { ParallaxBackgroundElement } from "../ParallaxBackgroundElement";
import { Player } from "../Player";
import { Projectile } from "../Projectile";
import { SceneManager } from "../SceneManager";
import { MenuScene } from "./MenuScene";
import * as particleSettings from "../Particles/onDeathParticleSettings.json"
import { Emitter, EmitterConfigV3, upgradeConfig } from "@pixi/particle-emitter";



export class GameScene extends Container implements IScene {
    private backgroundBase: Sprite;
    private backgroundFar: ParallaxBackgroundElement;
    private backgroundMid: ParallaxBackgroundElement;
    private backgroundNear: ParallaxBackgroundElement;

    private player: Player;
    private enemyList: Array<Enemy> = [];
    private projectileList: Array<Projectile> = [];
    private spawnEnemyTimer: number = 2000;

    private emitterSettings: EmitterConfigV3;

    constructor() {
        super();
        this.backgroundBase = Sprite.from("background_base");
        this.backgroundFar = new ParallaxBackgroundElement(Texture.from("background_far"), 0, 0, 0.08);
        this.backgroundMid = new ParallaxBackgroundElement(Texture.from("background_mid"), 0, 0, 0.15);
        this.backgroundNear = new ParallaxBackgroundElement(Texture.from("background_near"), 0, 0, 0.5);
        this.player = new Player(Sprite.from("player"), 100, SceneManager.height / 2, this);
        this.addChild(this.backgroundBase);
        this.addChild(this.backgroundFar);
        this.addChild(this.backgroundMid);
        this.addChild(this.backgroundNear);
        this.addChild(this.player.sprite);

        setInterval(() => this.createEnemy(), this.spawnEnemyTimer);
        setInterval(() => this.checkOutOfBoundProjectiles(), 1000);
        setInterval(() => this.checkOutOfBoundEnemies(), 1000);

        this.emitterSettings = upgradeConfig(particleSettings, Texture.from("on_death_particle"));
    }

    private createEnemy() {
        let enemy = new Enemy(Sprite.from("enemy"), SceneManager.width, SceneManager.height / 2);
        this.enemyList.push(enemy);
        this.addChild(enemy.sprite);
    }

    private removeEnemy(arrayIndex: number, emitParticles: boolean) {
        if (emitParticles) {
            this.createParticles(this.enemyList[arrayIndex].sprite.position.x, this.enemyList[arrayIndex].sprite.position.y);
        }
        this.removeChild(this.enemyList[arrayIndex].sprite);
        this.enemyList.splice(arrayIndex, 1);
    }

    private checkOutOfBoundEnemies() {
        for (let i = 0; i < this.enemyList.length; i++) {
            if (this.enemyList[i].sprite.position.x < 0) {
                this.removeEnemy(i, false);
                i--;
            }
        };
    }

    public createProjectile(startingPosX: number, startingPosY: number) {
        let proj = new Projectile(Sprite.from("projectile"), startingPosX, startingPosY);
        this.projectileList.push(proj);
        this.addChild(proj.sprite);
    }

    private removeProjectile(arrayIndex: number) {
        this.removeChild(this.projectileList[arrayIndex].sprite);
        this.projectileList.splice(arrayIndex, 1);
    }

    private checkOutOfBoundProjectiles() {
        for (let i = 0; i < this.projectileList.length; i++) {
            if (this.projectileList[i].sprite.position.x > SceneManager.width) {
                this.removeProjectile(i);
                i--;
            }
        };
    }

    private checkPlayerCollision() {
        for (let i = 0; i < this.enemyList.length; i++) {
            if (checkCollision(this.enemyList[i].sprite, this.player.sprite)) {
                this.gameOver();
            }
        }
    }

    private checkProjectileCollision() {
        for (let i = 0; i < this.enemyList.length; i++) {
            for (let j = 0; j < this.projectileList.length; j++) {
                if (checkCollision(this.enemyList[i].sprite, this.projectileList[j].sprite)) {
                    this.removeEnemy(i, true);
                    i--;
                    this.removeProjectile(j);
                    j--;
                    break;
                }
            }
        }
    }

    private gameOver() {
        this.createParticles(this.player.sprite.x + this.player.sprite.width / 2, this.player.sprite.y + this.player.sprite.height / 2);
        this.removeChild(this.player.sprite);
        this.player.onCollision();
        setTimeout(() => SceneManager.changeScene(new MenuScene()), 2000);
    }

    private createParticles(posX: number, posY: number) {
        let emitter = new Emitter(this, this.emitterSettings);
        emitter.autoUpdate = true;
        emitter.updateSpawnPos(posX, posY);
        emitter.playOnceAndDestroy();
    }

    update(frameCount: number) {
        this.backgroundFar.update(frameCount);
        this.backgroundMid.update(frameCount);
        this.backgroundNear.update(frameCount);
        for (let i = 0; i < this.enemyList.length; i++) {
            this.enemyList[i].update(frameCount);
        }

        for (let i = 0; i < this.projectileList.length; i++) {
            this.projectileList[i].update(frameCount);
        }
        this.checkProjectileCollision();
        if (this.player.isAlive) {
            this.player.update(frameCount);
            this.checkPlayerCollision();
        }
    }
}