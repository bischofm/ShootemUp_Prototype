import { SceneManager } from './SceneManager';
import { LoadingScene } from './Scenes/LoadingScene';

SceneManager.initialize(800,600);
const loadingScene: LoadingScene = new LoadingScene();
SceneManager.changeScene(loadingScene);