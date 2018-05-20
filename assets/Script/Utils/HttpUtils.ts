import ROUTE_DATA from './RequestRoutes';
import { HttpDEFINE } from '../Define/CommonDefine';
import _ from 'lodash';
// import 'whatwg-fetch';
// import fetch from 'cross-fetch';
// import 'cross-fetch/polyfill';

let HttpsUtil = {
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
            url = 'http://' + HttpsUtil.getHost() + '/';
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
        var [url, getParams] = HttpsUtil.createRoute(route, params);
        //create query
        var queryParams = '?';
        for (var param in getParams) {
            queryParams = queryParams + param + '=' + getParams[param] + '&';
        }
        queryParams = queryParams.substr(0, queryParams.length - 1);
        url = url + queryParams;
        HttpsUtil.HttpRequest('GET', url, null, callback, catchCallback, extra);
    },
    HTTPSPost: function (route: string, params: any, callback: Function = null, catchCallback: Function = null, extra: any = null) {
        var [url, getParams] = HttpsUtil.createRoute(route, params);
        //create query
        var bodyparams = {};
        for (var param in getParams) {
            bodyparams[param] = getParams[param];
        }
        HttpsUtil.HttpRequest('POST', url, bodyparams, callback, catchCallback, extra);
    },
    HttpRequest: function (type, url, params, callback, catchCallback, extra) {
        let fetchParam = {};
        if (type === 'GET') {
            fetchParam = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
            };
        } else if (type === 'POST') {
            fetchParam = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(params)
            };
        }
        var status = 200;
        let shouldRet = false;
        fetch(url, fetchParam)
            .then((response) => {
                status = response.status;
                switch (response.status) {
                    case 200: {
                        var type = response.headers.get('Content-Type');
                        if (type == null) {
                            shouldRet = true;
                            callback(null, null, extra);
                            break;
                        }
                        if (type.search('application/json') !== -1) {
                            return response.json();
                        } else if (type.search('text') !== -1) {
                            return response.text();
                        } else {
                            shouldRet = true;
                            callback(null, null, extra);
                        }
                        break;
                    }
                    case 204: {
                        shouldRet = true;
                        callback(null, null, extra);
                        break;
                    }
                    default: {
                        return response.json();
                    }
                }
            }).then((responseJson) => {
                if (shouldRet) {
                    return;
                }
                if (status === 200 || status === 204) {
                    callback(null, responseJson, extra);
                }
                else {
                    if (_.isFunction(catchCallback)) {
                        catchCallback(responseJson, extra);
                    } else {
                        callback(responseJson, null, null);
                    }
                }
            })
            .catch((error) => {
                console.error(JSON.stringify(error));
            });
    }
};

export default HttpsUtil;



// WEBPACK FOOTER //
// ./src/common/HttpsUtil.js