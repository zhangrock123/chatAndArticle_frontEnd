<template>
    <div id="app-container" class="contact-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'通讯录'" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
            <ul class="app-list app-list_grid no-radius font_15 userList" style="margin-top: 0;">
                <li class="arrow" @click="$root.queryTo('senthistory')">
                    <i class="icon-user-plus2 font_20"></i>我发送的请求
                </li>
                <li class="arrow" @click="$root.queryTo('receivedhistory')">
                    <i class="icon-user-check font_20"></i>我收到的请求
                </li>
            </ul>
            <ul class="app-list app-list_grid no-radius font_15 userList" v-if="friendList.length">
                <li class="arrow" v-for="friend in friendList" @click="$root.queryTo('contactdetail',{id: friend.friendId})">
                    <img class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="friend.friendPhoto | noPhoto" alt="">
                    <div class="font_14">{{friend.friendName}}</div>
                </li>
            </ul>
            <div v-else class="noSectionData">
                <div>
                    暂无相关好友信息，请添加好友～
                </div>
            </div>
        </section>
       <footer id="app-footer">
             <page-footer :active-index="'2'"></page-footer>
        </footer>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    import pageFooter from '../components/pageFooter.vue';
    var util=require('../libs/util.js');
    export default {
		data() {
			return {
                pageRight:'<i class="icon-plus2 font_18"></i>',
                friendList: []
            }
        },
        components: {
            pageHeader,
            pageFooter
        },
        computed: {
        },
        methods: {
           rightFn(){
               this.$root.queryTo('addfriends');
           },
           getFriendList(){
               var vm=this;
               var param={
                   token: util.getStore('userToken')
               };
               var ld=loading();
               vm.$root.service('friendsList', param, function(res){
                    ld.destroy();
                    vm.friendList=res.data || [];
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
            vm.getFriendList();
        }
    };

</script>
<style>
    .contact-page .imgCover{
        width: 4rem;
        height: 4rem;
        vertical-align: top;
    }
    .contact-page .userList div{
        display: inline-block;
        margin-left: .5rem;
        line-height: 4rem;
    }
    .contact-page .userList i{
        margin-right: 1rem;
        color: #09f;
        margin-top: -.2rem;
    }
</style>
