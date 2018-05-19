const {
    ccclass,
    property
} = cc._decorator;

import SceneManager from '../Manager/SceneManager';
import SceneIdConfigManager from '../Manager/SceneIdConfigManager';
import { EmSceneId } from '../Define/CommonDefine';
import PrefabManager, { EmPrefabEnum } from '../Manager/PrefabManager';

@ccclass
class LoginScene extends cc.Component{
    onDestroy() {

    }

    onLoad() {
    }

    start() {}

    onLoginClick() {
        // PrefabManager.showPrefab(EmPrefabEnum.HelloWorld, [1,2,3]);
        SceneManager.changeScene(SceneIdConfigManager.getSceneIdByKey(EmSceneId.MainScene));
    }

};