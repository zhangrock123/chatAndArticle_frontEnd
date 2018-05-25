var Vue = require('vue');
var VueRouter = require('vue-router');
var filters = require('./filters.js');
var routerMap = require('./routers.js');
var services = require('./services/main.js');
var dialog = require('./libs/widget-myDialog.js');
var util = require('./libs/util.js');
var dirctive = require('./directives/common.js');
//https://github.com/binnng/debug.js
// var debug = require('./libs/debug.js');

require('./assets/styles/fonts.css');
require('./assets/styles/normalize.css');
require('./assets/styles/common.css');
require('./assets/styles/myDialog.css');

Vue.use(VueRouter);
// Vue.config.debug = true
//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
dirctive.init(Vue);

//实例化VueRouter
var router = new VueRouter({
    hashbang: false,
    // transitionOnLoad: true
});


var root = Vue.extend({
    template: '<router-view></router-view>',
    data() {
        return {
            
        };
    },
    computed: {},
    components: {
    },
    events: {
    },
    methods: {
        queryTo(pathName, queryData){
            if(!pathName) return;
            queryData=queryData || {};
            if(pathName.indexOf('/') == -1) {
                pathName='/'+pathName;
            }
            this.$route.router.go({path:pathName, query: queryData});
        },
        errProcesser(errCode, errMsg){
            var vm=this;
            if(errCode=='1001') return;
            if(errCode){
                alert(errMsg);
            }
            switch(errCode){
                case '9002':
                case '9003':
                    vm.queryTo('login');
                    break;
            }
        },
        service(serviceName, args, sucFn, errFn, serviceErrFn){
            if(!serviceName) return;
            args=args || {};
            var vm=this;
            return services[serviceName](args)
                .then(function(res){
                    res=res.data;
                    if(res.success){
                        sucFn && sucFn(res);
                    }else{
                        vm.errProcesser(res.errNo, res.errMsg);
                        errFn && errFn(res);
                    }
                },function(){
                    serviceErrFn && serviceErrFn();
                });
        },
        postAjax(url, data, sucFn, errFn){
            data = data || {};
            var args=[];
            for(var k in data){
                if(typeof(data[k]) == 'object'){
                    data[k].forEach(function(val){
                        args.push(k+'='+val);
                    })
                }else{
                    args.push(k+'='+data[k]);
                }
            }
            var argsStr=args.join("&");
            var xmlhttp;
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    var res=JSON.parse(xmlhttp.responseText);
                    if(res.success){
                        sucFn && sucFn(res);
                    }else{
                        vm.errProcesser(res.errNo, res.errMsg);
                        errFn && errFn(res);
                    }
                }
            }
            xmlhttp.open('post', url, true);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xmlhttp.send(argsStr);
        }
    },
    ready() {
    }
});

window.services = services;
routerMap(router);


router.start(root, "#main");

//默认路由至404
router.redirect({
    '*': '/login'
});