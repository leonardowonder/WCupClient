const {ccclass, property} = cc._decorator;

@ccclass
class SceneManager{
    changeScene(key, callback = null) {
        cc.director.loadScene(key, callback);
    }
};
export default new SceneManager();