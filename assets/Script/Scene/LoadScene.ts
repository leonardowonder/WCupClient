const {
    ccclass,
    property
} = cc._decorator;

import * as async from 'async';
import moment from 'moment';

import HttpUtils from '../Utils/HttpUtils';
import SceneManager from '../Manager/SceneManager';
import ConfigManager from '../Manager/ConfigManager';
import SceneIdConfigManager from '../Manager/SceneIdConfigManager';
import {
    EmSceneId
} from '../Define/CommonDefine';
import PrefabManager, {
    EmPrefabEnum
} from '../Manager/PrefabManager';
import TableView from '../Component/TableView';

@ccclass
class LoginScene extends cc.Component {

    onDestroy() {

    }

    test() {
        cc.log('test start');

        //test
    }

    foo() {
        cc.log('foo start');

        //foo
        // let recentlyRequest = moment().unix();
        // HttpUtils.HTTPSGet('GetTaskList',
        //     { p: '' },
        //     (err, strJson, requestTime) => {
        //         if (err == null) {
        //             if (recentlyRequest !== requestTime) {
        //                 return;
        //             }
        //         }
        //     },
        //     function (err) {
        //         console.warn('err =', err);
        //     }.bind(this),
        //     recentlyRequest);
    }

    onLoad() {
        // this.test();
        // this.foo();
        this._doLoadings();
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