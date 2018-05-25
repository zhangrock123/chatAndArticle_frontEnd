module.exports = function(router) {
    router.transitionOnLoad = true;
    router.map({
        '/index': { //文章列表
            component: function(resolve) {
                require(['./views/index.vue'], resolve);
            }
        },
        '/login': { //登录页面
            component: function(resolve) {
                require(['./views/login.vue'], resolve);
            }
        },
        '/regist': { //注册页面
            component: function(resolve) {
                require(['./views/regist.vue'], resolve);
            }
        },
        '/newarticle': { //创建文章页面
            component: function(resolve) {
                require(['./views/newArticle.vue'], resolve);
            }
        },
        '/newarticletype': { //创建文章类型页面
            component: function(resolve) {
                require(['./views/newArticleType.vue'], resolve);
            }
        },
        '/editarticletype': { //管理文章类型页面
            component: function(resolve) {
                require(['./views/editArticleType.vue'], resolve);
            }
        },
        '/editarticletypename': { //管理文章类型页面
            component: function(resolve) {
                require(['./views/editArticleTypeName.vue'], resolve);
            }
        },
        '/contact': { //通讯录页面
            component: function(resolve) {
                require(['./views/contact.vue'], resolve);
            }
        },
        '/contactdetail': { //好友详情页面
            component: function(resolve) {
                require(['./views/contactInfo.vue'], resolve);
            }
        },
        '/my': { //我的 页面
            component: function(resolve) {
                require(['./views/my.vue'], resolve);
            }
        },
        '/chathistory': { //聊天历史页面
            component: function(resolve) {
                require(['./views/chatHistory.vue'], resolve);
            }
        },
        '/chat': { //聊天页面
            component: function(resolve) {
                require(['./views/chat.vue'], resolve);
            }
        },
        '/articledetail': { //文章详情页面
            component: function(resolve) {
                require(['./views/articleDetail.vue'], resolve);
            }
        },
        '/infoedit': { //我的信息编辑页面
            component: function(resolve) {
                require(['./views/myInfoEdit.vue'], resolve);
            }
        },
        '/addfriends': { //添加好友页面
            component: function(resolve) {
                require(['./views/addFriends.vue'], resolve);
            }
        },
        '/senthistory': { //历史发送好友申请页面
            component: function(resolve) {
                require(['./views/requestSentHistory.vue'], resolve);
            }
        },
        '/receivedhistory': { //历史收到好友申请页面
            component: function(resolve) {
                require(['./views/requestReceivedHistory.vue'], resolve);
            }
        },
        '/myphoto': { //我的头像页面
            component: function(resolve) {
                require(['./views/myPhoto.vue'], resolve);
            }
        },
        '/changepassword': { //设置密码页面
            component: function(resolve) {
                require(['./views/changePassword.vue'], resolve);
            }
        },
    });
}