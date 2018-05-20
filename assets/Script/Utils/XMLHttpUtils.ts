import ROUTE_DATA from './RequestRoutes';
import { HttpDEFINE } from '../Define/CommonDefine';
import _ from 'lodash';
// import 'whatwg-fetch';
// import fetch from 'cross-fetch';
// import 'cross-fetch/polyfill';

let XMLHttpUtil = {
    isDevEnv: function () {
        return HttpDEFINE.IsDev;
    },
    setDevHost: function (host) {
        if (HttpDEFINE.IsDev) {
            localStorage.setItem('DevHost', host);
        }
    },
    getHost: function () {
        if (HttpDEFINE.IsDev && localStorage.getItem('DevHost') !== '' && localStorage.getItem('DevHost') != null) {
            return localStorage.getItem('DevHost');
        }
        // if (process.env.NODE_ENV === 'development') {
        //     return HttpDEFINE.Host.development;
        // } else {
        //     return HttpDEFINE.Host.production;
        // }
        return HttpDEFINE.Host.development;
    },
    createRoute: function (route, params) {
        let a = new RegExp(HttpDEFINE.Regex.url);
        var url = '';
        if (a.exec(route)) {
            url = route;
        } else {
            url = 'http://' + XMLHttpUtil.getHost() + '/';
            url = url + (ROUTE_DATA[route] == null ? '' : ROUTE_DATA[route]);
        }
        var getParams = {};
        //create params
        for (var param in params) {
            if (url.search(':' + param) !== -1) {
                url = url.replace(':' + param, params[param]);
            } else {
                getParams[param] = params[param];
            }
        }
        return [url, getParams];
    },
    HTTPSGet: function (route: string, params: any, callback: Function = null, catchCallback: Function = null, extra: any = null) {
        var [url, getParams] = XMLHttpUtil.createRoute(route, params);
        //create query
        var queryParams = '?';
        for (var param in getParams) {
            queryParams = queryParams + param + '=' + getParams[param] + '&';
        }
        queryParams = queryParams.substr(0, queryParams.length - 1);
        url = url + queryParams;
        XMLHttpUtil.HttpRequest('GET', url, null, callback, catchCallback, extra);
    },
    HTTPSPost: function (route: string, params: any, callback: Function = null, catchCallback: Function = null, extra: any = null) {
        var [url, getParams] = XMLHttpUtil.createRoute(route, params);
        //create query
        var bodyparams = {};
        for (var param in getParams) {
            bodyparams[param] = getParams[param];
        }
        XMLHttpUtil.HttpRequest('POST', url, bodyparams, callback, catchCallback, extra);
    },
    HttpRequest: function (type, url, params, callback, catchCallback, extra) {
        var status = 200;
        let shouldRet = false;

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
        xhr.onloadstart = () => { cc.log('wd debug onloadstart', arguments) }
        xhr.onloadend = () => { cc.log('wd debug onloadend', arguments) }
        xhr.onabort = () => { cc.log('wd debug onabort', arguments) }
        xhr.onprogress = () => { cc.log('wd debug onprogress', arguments) }
        xhr.onreadystatechange = () => { cc.log('wd debug onreadystatechange', arguments) }
        
        xhr.open(type, url, true);
        xhr.send();
    }
};

export default XMLHttpUtil;