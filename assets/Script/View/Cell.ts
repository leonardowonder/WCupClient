const {
    ccclass,
    property
} = cc._decorator;

import ViewCell from '../Component/ViewCell'

@ccclass
class Cell extends ViewCell{
    @property(cc.Label)
    m_label: cc.Label = null;

    init(index, data, reload, group) {
        this.m_label.string = index;
    }
    clicked() {
        
    }
};