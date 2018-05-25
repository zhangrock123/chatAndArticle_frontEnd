var config = require('../config.js');
var util = require('../libs/util.js');

module.exports = {
    init: function(Vue) {
        var self=this;
        return {
            friendsList(data) {
                return Vue.http.get(self.host+'friendsList', data);
            },
            sendRequest(data) {
                return Vue.http.post(self.host+'sendRequest', data);                
            },
            acceptRequest(data) {
                return Vue.http.post(self.host+'acceptRequest', data);
            },
            rejectRequest(data) {
                return Vue.http.post(self.host+'rejectRequest', data);
            },
            deletefriend(data) {
                return Vue.http.post(self.host+'deletefriend', data);
            },
            sentHistory(data) {
                return Vue.http.get(self.host+'requestSentHistory', data);
            },
            receivedHistory(data) {
                return Vue.http.get(self.host+'requestReceivedHistory', data);
            },
            friendDetail(data){
                return Vue.http.post(self.host+'friendDetail', data);          
            }
        };
    },
    host: config.apiHost+'friends.asp?action='
};