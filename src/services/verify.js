var config = require('../config.js');
var util = require('../libs/util.js');

module.exports = {
    init: function(Vue) {
        var self=this;
        return {
            imageToken(data) {
                return Vue.http.post(self.host+'imageToken', data); 
            }
        }
    },
    host: config.apiHost+'verify.asp?action='
};