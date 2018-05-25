<template>
    <div id="app-container" class="contactinfo-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'好友资料'" :page-left="pageLeft"></page-header>
        </header> 
        <section id="app-body">
            <ul class="app-list app-list_grid no-radius font_15 friendPhoto">
                <li>
                    <img class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="friendInfo.userPhoto | noPhoto" alt="">
                    <div class="font_14">{{friendInfo.userName}}</div>
                </li>
            </ul>
            <ul class="app-list app-list_grid no-radius font_15">
                <li>
                    <div class="app-table">
                        <div class="app-table-full">联系方式</div>
                        <div class="text-right text-highGray">{{friendInfo.userPhone}}</div>
                    </div>
                </li>
                <li>
                    <div class="app-table">
                        <div class="app-table-full">邮箱</div>
                        <div class="text-right text-highGray">{{friendInfo.userEmail}}</div>
                    </div>
                </li>
                <li class="text-highGray">
                    {{friendInfo.userRemark || '无'}}
                </li>
            </ul>
            <div class="btnList">
                <a href="javascript:;" class="btn bg-blue text-white" @click="$root.queryTo('chat',{id: friendInfo.userId})">发送消息</a>
                <a href="javascript:;" class="btn bg-red text-white" @click="deleteFriendConfirm()">删除好友</a>
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
                friendId: this.$route.query.id || null,
                friendInfo: {}
            }
        },
        components: {
            pageHeader,
        },
        computed: {
        },
        methods: {
           getFriendDetailInfo(){
               var vm=this;
               var param={
                   token: util.getStore('userToken'),
                   id: vm.friendId
               };
               var ld=loading();
               vm.$root.service('friendDetail', param, function(res){
                    ld.destroy();
                    vm.friendInfo=res.data || {};
                },function(){
                    ld.destroy();
                },function(){
                    ld.destroy();
                })
           },
           deleteFriendConfirm(){
               var vm=this;
               confirm('是否删除该好友？', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            vm.deleteFriendAction();
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消'){
                            this.destroy();
                        }
                    }
                });
           },
           deleteFriendAction(){
               var vm=this;
               var param={
                   token: util.getStore('userToken'),
                   id: vm.friendId
               };
               var ld=loading();
               vm.$root.service('deletefriend', param, function(res){
                    ld.destroy();
                    window.history.go(-1);
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
            vm.getFriendDetailInfo();
        }
    };

</script>
<style>
    .contactinfo-page .imgCover{
        width: 6rem;
        height: 6rem;
        vertical-align: top;
        
    }
    .contactinfo-page .friendPhoto div{
        display: inline-block;
        margin-left: .5rem;
        line-height: 3rem;
    }
    .contactinfo-page .btnList{
        width: 90%;
        margin: auto;
        margin-top: 3rem;
    }
    .contactinfo-page .btnList a{
        margin-top:1rem;
    }    
</style>
