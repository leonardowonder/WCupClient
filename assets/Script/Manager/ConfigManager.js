const {
    ccclass,
    property
} = cc._decorator;

import * as async from 'async';

import SceneIdConfigManager from './SceneIdConfigManager';
import StringConfigManager from './StringConfigManager';

@ccclass
class ConfigManager {
    loadCfgs(callback) {
        async.waterfall(
            [
                (next) => {
                    SceneIdConfigManager.loadRes(next);
                },
                (err, next) => {
                    if (err) {
                        cc.warn('ConfigManager loadCfgs err =', err);
                    }
                    StringConfigManager.loadRes(next);
                },
                (err, next) => {
                    if (err) {
                        cc.warn('ConfigManager loadCfgs err =', err);
                    }
                    next();
                }
            ],
            (err) => {
                callback && callback();
            }
        )
    }
}
export default new ConfigManager();