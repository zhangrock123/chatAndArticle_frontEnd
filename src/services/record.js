var config = require('../config.js');
var util = require('../libs/util.js');

module.exports = {
    init: function(Vue) {
        var self=this;
        return {
            createRecord(data) {
                return Vue.http.post(self.host+'createRecord', data); 
            },
            deleteRecord(data) {
                return Vue.http.post(self.host+'deleteRecord', data); 
            },
            recordList(data) {
                return Vue.http.get(self.host+'recordList', data); 
            },
            recordDetail(data) {
                return Vue.http.get(self.host+'recordDetail', data); 
            },
            recordTypeList(data) {
                return Vue.http.get(self.host+'recordTypeList', data); 
            },
            createRecordType(data) {
                return Vue.http.post(self.host+'createRecordType', data); 
            },
            updateRecordType(data) {
                return Vue.http.post(self.host+'updateRecordType', data); 
            },
            deleteRecordType(data) {
                return Vue.http.post(self.host+'deleteRecordType', data); 
            }
        };
    },
    host: config.apiHost+'record.asp?action='
};