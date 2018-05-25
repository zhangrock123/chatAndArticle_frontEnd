<template>
    <div id="app-container" class="chatHistory-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'聊天历史'" ></page-header>
        </header> 
        <section id="app-body">
            <ul class="app-list app-list_grid no-radius font_15" v-if="chatHistoryList.length">
                <li class="arrow chatList" v-for="chat in chatHistoryList" @click="$root.queryTo('chat',{id: chat.UserId==chat.fromId?chat.toId:chat.fromId})">
                    <div class="app-table">
                        <div>
                            <span class="photoContainer"><img class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="  :style="(chat.UserId==chat.fromId?chat.toPhoto:chat.fromPhoto) | noPhoto"  alt=""></span>
                        </div>
                        <div class="app-table-full">
                            <span>
                                <div class="font_14 app-ellipsis-1">{{chat.UserId==chat.fromId?chat.toName:chat.fromName}}</div>
                                <div class="font_12 app-ellipsis-1 text-gray">{{chat.content}}</div>
                                <div class="font_11 text-lightGray text-right">{{chat.createTime}}</div>
                            </span>
                        </div>
                    </div>
                    
                </li>
            </ul>
            <div class="noPageData app-table text-center" v-else>
                <div>
                    <i class="icon-exclamation-triangle"></i>
                    暂无相关信息
                </div>
            </div>
        </section>
       <footer id="app-footer">
             <page-footer :active-index="'0'"></page-footer>
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
                chatHistoryList: []
            }
        },
        components: {
            pageHeader,
            pageFooter
        },
        computed: {
        },
        methods: {
           getLastChat(){
               var vm=this;
               var param={
                   token: util.getStore('userToken')
               };
               var ld=loading();
               vm.$root.service('getLastChat', param, function(res){
                   ld.destroy();
                    vm.chatHistoryList=res.data || [];
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
            vm.getLastChat();
        }
    };

</script>
<style>
    .chatHistory-page .imgCover{
        width: 6rem;
        height: 6rem;
        vertical-align: top;
        /*margin-right: 1rem;*/
    }
    .chatHistory-page .photoContainer{
        display: inline-block;
        width: 7rem;
    }
    .chatHistory-page .chatList span div{
        height: 2rem;
        line-height: 2rem;
    }
    .chatHistory-page .chatList>div div{
        /*height: 2rem;
        line-height: 2rem;*/
    }
</style>
