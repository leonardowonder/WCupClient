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
        // for (let i=0; i<5; ++i) {
        //     PrefabManager.showPrefab(EmPrefabEnum.Loading);
        // }
        SceneManager.changeScene(SceneIdConfigManager.getSceneIdByKey(EmSceneId.MainScene));
    }
};