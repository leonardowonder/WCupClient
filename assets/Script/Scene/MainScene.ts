const {
    ccclass,
    property
} = cc._decorator;

import HttpUtil from '../Utils/HttpUtils';

@ccclass
class MainScene extends cc.Component {
    onDestroy() {

    }

    onLoad() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                var json = JSON.parse(response);
                console.log(response, json);
            }
        }.bind(this);
        xhr.onerror = () => { cc.log('wd debug onerror', arguments) }
        xhr.ontimeout = () => { cc.log('wd debug onabontimeoutort', arguments) }
        xhr.onabort = () => { cc.log('wd debug onabort', arguments) }
        xhr.onloadstart = 
        xhr.onloadend
        //
        var url = "http://210.73.214.68:30002/user/getSchedules";
        xhr.open("GET", url, true);
        xhr.send();
    }

    start() { }
};