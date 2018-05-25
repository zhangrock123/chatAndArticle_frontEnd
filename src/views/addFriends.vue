<template>
    <div id="app-container" class="addFriends-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'添加好友'" :page-left="pageLeft"></page-header>
        </header> 
        <section id="app-body">
            <div class="searchBar">
                <input type="search" class="font_14" v-model="keyword" @search="searchUser()" debounce="500" placeholder="输入好友关键字/邮箱/手机号">
            </div>
            <ul class="app-list app-list_grid no-radius font_15 userList" v-if="userList.length">
                <li class="arrow" v-for="user in userList" @click="addUser(user)" >
                    <div class="app-table">
                        <div>
                            <span>
                                <img class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="myuserInfo.userPhoto | noPhoto" alt="">
                            </span>
                        </div>
                        <div class="app-table-full">
                            <span class="font_14">
                                <div class="app-ellipsis-1">{{user.userName}}</div>
                                <div class="app-ellipsis-1 text-gray font_12">手机号: <span class="text-lightGray">{{user.userPhone || '无'}}</span></div>
                                <div class="app-ellipsis-1 text-gray font_12">邮箱: <span class="text-lightGray">{{user.userEmail || '无'}}</span></div>
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="noSectionData" v-if="!userList.length && keyword">
                <div>
                    未找到相关信息，请重新匹配～
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    var util=require('../libs/util.js');
    export default {
		data() {
			return {
                pageLeft:'<i class="icon-arrow-left2 font_22"></i>',
                keyword: '',
                userList: []
            }
        },
        components: {
            pageHeader,
        },
        computed: {
        },
        methods: {
           searchUser(){
                var vm=this;
                if(!vm.keyword){
                    return vm.userList=[];
                }
                var ld=loading();
                var param={
                    token: util.getStore('userToken'),
                    keyword: vm.keyword,
                    limit:20
                };
                vm.$root.service('searchUser', param, function(res){
                    ld.destroy();
                    vm.userList=res.data || [];
                },function(){
                    ld.destroy();
                    vm.userList=[];
                },function(){
                    ld.destroy();
                })
           },
           addUser(userInfo){
               var vm=this;
               confirm('<h3>发送添加好友请求</h3><input type="text" placeholder="你好，我想加你为好友～" id="addFriendTips">', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            var tips=document.getElementById('addFriendTips').value;
                            vm.addUserAction(userInfo.userId, tips);
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消')
                            this.destroy();
                    }
                });
           },
           addUserAction(id, content){
               var vm=this;
               var param={
                   token: util.getStore('userToken'),
                   id: id,
                   content: content || '你好，我想加你为好友～'
               };
               var ld=loading();
               vm.$root.service('sendRequest', param, function(res){
                    ld.destroy();
                    tip('已发送好友请求，等待对方同意～');
                    // window.history.go(-1);
                },function(){
                    ld.destroy();
                },function(){
                    ld.destroy();
                })
           }
        },
        events:{
            
        },
        ready(){
            var vm=this;
        }
    };

</script>
<style>
      .addFriends-page{

      }
      .addFriends-page .searchBar{
          /*background-color: #ddd;*/
          padding: 1rem 1.3rem;
          border-bottom: 1px solid #ddd;
      }
      .addFriends-page .searchBar input{
          padding: 0;
          margin: 0;
          border: 0;
          height: 3.2rem;
          line-height: 1.2;
          -webkit-appearance: none;
          width: 100%;
          border-radius: .2rem;
          text-align: center;
          background-color: #fff;
      }
      .addFriends-page .imgCover{
        width: 6rem;
        height: 6rem;
        vertical-align: top;
    }
    .addFriends-page .userList .app-table>div:first-child span{
        display: inline-block;
        width: 7rem;
    }
    .addFriends-page .userList>div div{
        height: 2rem;
    }
    #addFriendTips{
        margin: 0;
        padding: ;
        border: 1px solid #ccc;
        width: 90%;
        -webkit-appearance: none;
        border-radius: .2rem;
        height: 2.6rem;
        text-align: center;
        margin-top: 1rem;
    }
</style>
