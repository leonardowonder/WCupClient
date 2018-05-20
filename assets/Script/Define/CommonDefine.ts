export enum EmCommonResult {
    OK = 0,
    FAIL = 1
}

export enum EmSceneId {
    LoadScene = 'LoadScene',
    LoginScene = 'LoginScene',
    MainScene = 'MainScene'
}

export let HttpDEFINE = {
    Regex: {
        url: '((http|ftp|https)://)(([a-zA-Z0-9._-]+.[a-zA-Z]{2,6})|([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9&%_./-~-]*)?'
    },
    Host: {
        development: '210.73.214.68:30002',
        // production: 'api.prod.egobus.com',
        // configHost: 'http://res.egobus.com/json/prod/',
    },
    IsDev: true
};