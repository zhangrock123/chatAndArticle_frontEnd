var customerService = require('./customer.js');
var friendsService = require('./friends.js');
var msgService = require('./msg.js');
var recordService = require('./record.js');
var verifyService = require('./verify.js');

var Vue = require('vue');
var VueResource = require('vue-resource');
var util = require('../libs/util.js');

// Javascript
Vue.use(VueResource);
// HTTP相关

Vue.http.options.emulateJSON = true;
// Vue.http.headers={'Content-Type': 'application/x-www-form-urlencoded'}
// Vue.http.options.emulateJSON = true
// Vue.http.headers['Content-Type']='application/x-www-form-urlencoded';
Vue.http.options.crossOrigin = true;
Vue.http.interceptors.push({
    request(request) {
        return request;
    },
    response(response) {
        return response
    }
});

module.exports = (function(Vue) {
    var apis = util._extend(
        customerService.init(Vue),
        friendsService.init(Vue),
        msgService.init(Vue),
        recordService.init(Vue),
        verifyService.init(Vue)
    );

    return apis;

})(Vue);