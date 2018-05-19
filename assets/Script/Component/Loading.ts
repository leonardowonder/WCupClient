const { ccclass, property } = cc._decorator;

import * as async from 'async';

@ccclass
export default class Loading extends cc.Component {
    @property(cc.Label)
    m_loadingLabel: cc.Label = null;

    @property
    m_string = 'loading';

    @property
    m_intarval = 0.5;

    @property
    m_dotCount = 3;

    _initCount = 0;

    _registEvent() {
        this._unregistEvent();
        // cc.systemEvent.on(clientEventDefine.CUSTOM_EVENT_STOP_LOADING, this._hide, this);
    }

    _unregistEvent() {
        // cc.systemEvent.off(clientEventDefine.CUSTOM_EVENT_STOP_LOADING, this._hide, this);
    }

    onLoad() {
    }

    onEnable() {
        // this._registEvent();
    }

    onDisable() {
        // this._unregistEvent();
        this.unschedule(this._loadingfunc);
    }

    onDestroy() {
        
    }

    init() {
        this.m_loadingLabel.string = this.m_string;
        this._startLoading();
    }

    _loadingfunc() {
        let str = this.m_string;
        let docCnt = this._initCount++ % (this.m_dotCount + 1);

        if (this._initCount > this.m_dotCount) {
            this._initCount = 0;
        }

        while(docCnt > 0) {
            str += '.';
            docCnt--;
        } 

        this.m_loadingLabel.string = str;
    }

    _startLoading() {
        let str = '';
        this.unschedule(this._loadingfunc);
        this.schedule(this._loadingfunc, this.m_intarval)
    }

    _hide() {      
        this.node.active = false;
    }
}
