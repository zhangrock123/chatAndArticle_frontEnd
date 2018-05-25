var config = require('../config.js');
var util = require('../libs/util.js');

module.exports = {
    init: function(Vue) {
        var self=this;
        return {
            messageList(data) {
                return Vue.http.get(self.host+'messageList', data); 
            },
            sendMessage(data) {
                return Vue.http.post(self.host+'sendMessage', data); 
            },
            setReadStatus(data) {
                return Vue.http.post(self.host+'setReadStatus', data); 
            },
            unreadCount(data) {
                return Vue.http.get(self.host+'unreadCount', data); 
            },
            getLastChat(data){
                return Vue.http.get(self.host+'getLastChat', data);             
            }
        };
    },
    host: config.apiHost+'msg.asp?action='
};