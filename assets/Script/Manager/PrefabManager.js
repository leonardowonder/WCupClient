const {
    ccclass,
    property
} = cc._decorator;

export let EmPrefabEnum = {
    Loading: 0,
}

@ccclass
class PrefabManager extends cc.Component {
    static s_prefabConfig = [{
        path: 'Prefab/Loading',
        componentName: 'Loading'
    }];

    _getCanvasNode() {
        let sceneNode = cc.director.getScene();
        let ret = null;
        for (let i = 0; i < sceneNode.children.length; ++i) {
            if (sceneNode.children[i].getComponent(cc.Canvas)) {
                ret = sceneNode.children[i];
                break;
            }
        }

        return ret;
    }

    _getComponentByKey(key, parentNode) {
        let ret = null;
        if (parentNode == null) {
            parentNode = this._getCanvasNode();
        }
        if (parentNode && parentNode.children && parentNode.children.length > 0) {
            for (let i = 0; i < parentNode.children.length; i++) {
                let component = parentNode.children[i].getComponent(PrefabManager.s_prefabConfig[key].componentName);
                if (component) {
                    ret = component;
                    component.node.setSiblingIndex(parentNode.children.length - 1);
                    break;
                }
            }
        }

        return ret;
    }

    _initPrefab(node, key, params) {
        let component = node.getComponent(PrefabManager.s_prefabConfig[key].componentName);
        if (component && component.init) {
            if (params == null) {
                component.init();
            }
            else {
                component.init(...params);
            }
        }
    }

    showPrefab(key, params = null, parentNode = null) {
        let component = this._getComponentByKey(key, parentNode);
        if (component) {
            component.node.active = true;
            this._initPrefab(component.node, key, params);
        } else {
            cc.loader.loadRes(PrefabManager.s_prefabConfig[key].path, function (err, res) {
                if (err == null) {
                    let prefab = cc.instantiate(res);
                    this._initPrefab(prefab, key, params);

                    let rootNode = parentNode;
                    if (!rootNode) {
                        rootNode = this._getCanvasNode();
                    }
                    prefab.setPosition(0, 0);
                    rootNode.addChild(prefab);
                }
            }.bind(this))
        }
    }

    hidePrefab(key, parentNode = null) {
        let component = this._getComponentByKey(key, parentNode);
        if (component) {
            component.node.active = false;
        }
    }
}

export default new PrefabManager();