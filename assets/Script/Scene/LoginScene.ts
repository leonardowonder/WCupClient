const {
    ccclass,
    property
} = cc._decorator;

import SceneManager from '../Manager/SceneManager';
import SceneIdConfigManager from '../Manager/SceneIdConfigManager';
import StringUtils from '../Utils/StringUtils';
import { EmSceneId } from '../Define/CommonDefine';
import PrefabManager, { EmPrefabEnum } from '../Manager/PrefabManager';

@ccclass
class LoginScene extends cc.Component{
    onDestroy() {

    }

    onLoad() {
    }

    start() {}

    onLoginClick() {
        // for (let i=0; i<5; ++i) {
        //     PrefabManager.showPrefab(EmPrefabEnum.Loading);
        // }var params = {};
        
        // params.user = this.state.userName;
        // params.password = this.state.pass;
        // if (this.state.userName !== '' && this.state.pass !== '') {
        //     HttpsUtil.HTTPSPost('Signin',
        //         params,
        //         this.onLoginComplete.bind(this),
        //         function (err) {
        //             notification['error']({
        //                 message: '登陆',
        //                 description: JSON.stringify(err)
        //             });
        //         }
        //     );
        // }
        SceneManager.changeScene(SceneIdConfigManager.getSceneIdByKey(EmSceneId.MainScene));
    }
};