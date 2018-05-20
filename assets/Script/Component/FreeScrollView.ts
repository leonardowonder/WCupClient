const {
    ccclass,
    property
} = cc._decorator;

@ccclass
export default class FreeScrollView extends cc.ScrollView {
    _clampDelta(delta: cc.Vec2) {
        // var contentSize = this.content.getContentSize();
        // var scrollViewSize = this.node.getContentSize();
        // if (contentSize.width < scrollViewSize.width) {
        //     delta.x = 0;
        // }
        // if (contentSize.height < scrollViewSize.height) {
        //     delta.y = 0;
        // }

        return delta;
    }
}
