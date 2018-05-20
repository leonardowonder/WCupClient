import StringConfigManager from '../Manager/StringConfigManager';

class StringUtils {
    formatByKey = function (...args) {
        if (arguments.length == 0)
            return '';
        let orgStr = StringConfigManager.getStrByKey(arguments[0]);

        let params = [];
        for (var i = 1; i < arguments.length; i++) {
            params.push(arguments[i]);
        }

        return this.formatByStr(orgStr, ...params);
    }

    formatByStr = function (...args) {
        if (arguments.length == 0)
            return '';

        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    }

    getFormatTime(s: number) {
        var t;

        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = Math.floor(s % 60);
            if (hour < 10) {
                t = '0' + hour + ":";
            } else {
                t = hour + ":";
            }

            if (min < 10) { t += "0"; }
            t += min + ":";
            if (sec < 10) { t += "0"; }
            t += sec;
        }

        return t;
    }
}

export default  new StringUtils();