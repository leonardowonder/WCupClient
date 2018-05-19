const {
    ccclass,
    property
} = cc._decorator;

import * as async from 'async';

import SceneManager from '../Manager/SceneManager';
import ConfigManager from '../Manager/ConfigManager';
import SceneIdConfigManager from '../Manager/SceneIdConfigManager';
import {
    EmSceneId
} from '../Define/CommonDefine';
import PrefabManager, {
    EmPrefabEnum
} from '../Manager/PrefabManager';

@ccclass
class LoginScene extends cc.Component {
    onDestroy() {

    }

    onLoad() {
        this._doLoadings()
    }

    _jumpToLoginScene() {
        SceneManager.changeScene(SceneIdConfigManager.getSceneIdByKey(EmSceneId.LoginScene));
    }

    _loadConfigs(callback) {
        ConfigManager.loadCfgs(callback);
    }

    _doLoadings() {
        async.waterfall(
            [
                (next) => {
                    PrefabManager.showPrefab(EmPrefabEnum.Loading);
                    next();
                },
                (next) => {
                    this._loadConfigs(next);
                },
                (next) => {
                    setTimeout(() => {
                        next();
                    }, 3000);
                }
            ],
            (err) => {
                PrefabManager.hidePrefab(EmPrefabEnum.Loading);
                this._jumpToLoginScene();
            }
        )
    }
};