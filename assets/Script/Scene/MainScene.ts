const {
    ccclass,
    property
} = cc._decorator;

import HttpUtil from '../Utils/HttpUtils';
import XMLHttpUtils from '../Utils/XMLHttpUtils';

@ccclass
class MainScene extends cc.Component {
    onDestroy() {

    }

    onLoad() {
        // XMLHttpUtils.HTTPSGet('getSchedules', {}, () => { cc.log('wd debug MainScene onLoad', arguments) })
        HttpUtil.HTTPSGet('getSchedules', {}, () => { cc.log('wd debug MainScene onLoad', arguments) })
    }

    start() { }
};