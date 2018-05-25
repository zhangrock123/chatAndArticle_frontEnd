var config = require('../config.js');

module.exports = {
    init: function(Vue) {
        var self=this;
        return {
            login(data) {
                return Vue.http.post(self.host+'userLogin', data);
            },
            regist(data) {
                return Vue.http.post(self.host+'userRegist', data);
            },
            changePhoto(data) {
                return Vue.http.post(self.host+'changePhoto', data);                
            },
            changePassword(data) {
                return Vue.http.post(self.host+'changePassword', data);                
            },
            searchUser(data) {
                return Vue.http.get(self.host+'searchUser', data);                
            },
            myInfo(data) {
                return Vue.http.get(self.host+'myInfo', data);                
            },
            changeMyInfo(data) {
                return Vue.http.post(self.host+'changeMyInfo', data);                
            }
        };
    },
    host: config.apiHost+'customer.asp?action='
};