const {
    ccclass,
    property
} = cc._decorator;

class StringConfigManager {
    m_config = null;
    
    loadRes(callback) {
        cc.loader.loadRes('Config/StringCfg', (err, res) => {
            if (err == null) {
                if (res) {
                    this.m_config = res;
                }
            }

            callback && callback(null, err);
        })
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