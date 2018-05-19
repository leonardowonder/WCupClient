const {
    ccclass,
    property
} = cc._decorator;

class StringConfigManager {
    loadRes(callback) {
        cc.loader.loadRes('Config/StringCfg', (err, res) => {
            if (err == null) {
                if (res.cfg) {
                    this.m_config = res.cfg;
                }
            }

            callback && callback(null, err);
        })
    }

    _getConfig() {
        return this.m_config;
    }

    getStrByKey(key, lan = 'cn') {
        let config = this.m_config;
        let ret = '';

        if (config == null) {
            return key;
        }

        if (config[key] && config[key][lan]) {
            ret = config[key][lan];
        }

        return ret;
    }
};

export default new StringConfigManager();