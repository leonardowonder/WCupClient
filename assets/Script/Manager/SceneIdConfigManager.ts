const {
    ccclass,
    property
} = cc._decorator;

@ccclass
class SceneIdConfigManager {
    m_config = null;

    loadRes(callback) {
        cc.loader.loadRes('Config/SceneIdCfg', (err, res) => {
            if (err == null) {
                this.m_config = res;
            }

            callback && callback(null, err);
        })
    }

    getSceneIdByKey(key) {
        let ret = null;
        if (this.m_config) {
            ret = this.m_config[key];
        }

        return ret;
    }
}
export default new SceneIdConfigManager();