<template>
    <div id="app-container" class="chat-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="title" :left-fn="leftFn" :page-left="pageLeft"></page-header>
        </header> 
        <section id="app-body" v-smart-scroll-bottom="msgList" v-el:scroll-dom>
            <div v-if="msgList.length && time.isHaveHistory" class="loadHistory" @click="loadHistory()">
                <a href="javascript:;">
                    <i class="icon-refresh"></i>
                    加载历史数据
                </a>
            </div>
            <div v-else class="noHistoryRecord text-center">
                没有更多历史信息了
            </div>
            <ul class="msgContainer" v-if="msgList.length">
                <li v-for="msg in msgList">
                    <div class="msgDate text-center font_13"><span>{{msg.createTime}}</span></div>
                    <div class="app-table app-table-top msgBox msgBox-from" v-if="msg.fromId==friendId">
                        <div class="msgPhoto">
                            <span>
                                <img class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="msg.fromPhoto | noPhoto" alt="">
                            </span>
                        </div>
                        <div class="msgContent app-table-full text-slightBlack font_15">
                            <span>
                                <div class="msg pull-left">{{msg.message}}</div>
                            </span>
                        </div>
                    </div>
                    <div class="app-table app-table-top msgBox msgBox-to" v-else>
                        <div class="msgContent app-table-full text-slightBlack font_15">
                            <span>
                                <div class="msg pull-right">{{msg.message}}</div>
                            </span>
                        </div>
                        <div class="msgPhoto">
                            <span>
                                <img class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="msg.fromPhoto | noPhoto" alt="">
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <footer id="app-footer" class="msgSendBox">
            <div class="msgSendBox-warper">
                <div class="app-table">
                    <div class="app-table-full">
                        <form action="javascript:;" class="search-input">
                            <input type="text" class="font_14" v-model="msgContent">
                        </form>
                    </div>
                    <div><label class="pre font_15" @click="sendMsg()">发送</label></div>
                </div>
            </div>
        </footer>
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
                msgContent: '',
                title: '',
                msgList: [],
                time:{
                    start: null,
                    end: null,
                    isHaveHistory: true
                },
                intervalObj:null,
                isInit: false
            }
        },
        components: {
            pageHeader,
        },
        computed: {
        },
        methods: {
           getChatInfo(start, end){
               var vm=this;
               var resData=[];
               var param={
                   token: util.getStore('userToken'),
                   id: vm.friendId,
                   limit: 20
               };
               if(start){
                   param.start=start;
               }
               if(end){
                   param.end=end;
               }
               vm.$root.service('messageList', param, function(res){
                    resData=(res.data || []).reverse();
                    if(start && !end){
                        if(resData && resData.length){
                            vm.msgList=resData.concat(vm.msgList);
                        }
                    }else{
                        vm.msgList=vm.msgList.concat(resData);
                    }
                    if(((!start && !end) || (start && !end)) && resData && resData.length && resData.length<param.limit){
                        vm.time.isHaveHistory=false;
                    }
                    vm.setTime(vm.msgList);
                    vm.setTitle(vm.msgList[0]);

                    if(vm.isInit) return;
                    vm.setScrollBottom();
                    vm.isInit=true;
                },function(){
                    if(start && !end){
                        vm.time.isHaveHistory=false;
                    }
                },function(){
                })
           },
           loadHistory(){
               var vm=this;
               vm.getChatInfo(vm.time.start);
           },
           setTitle(obj){
               var vm=this;
               if(!obj || vm.title) return;
                vm.title='和'+(obj.fromId==vm.friendId?obj.fromName:obj.toName)+'聊天中';
               
           },
           setTime(data){
               if(!data.length) return;
               var vm=this;
               vm.time.start=data[0].createTime;
               vm.time.end=data[data.length-1].createTime;
           },
           sendMsg(){
               var vm=this;
               if(!vm.msgContent){
                   return;
               }
               var param={
                   token: util.getStore('userToken'),
                   id: vm.friendId,
                   content: vm.msgContent || ''
               };
               vm.$root.service('sendMessage', param, function(res){
                    vm.msgContent='';
                    vm.setScrollBottom();
                },function(){
                },function(){
                    vm.intervalObj=clearInterval(vm.intervalObj);
                })
           },
           setScrollBottom(){
                var vm=this;
                vm.$nextTick(function(){
                    var scrollDom=vm.$els.scrollDom;
                    scrollDom.scrollTop=scrollDom.scrollHeight;
                })
           },
           leftFn(){
               var vm=this;
               vm.intervalObj=clearInterval(vm.intervalObj);
               window.history.go(-1);
           }
        },
        events:{
            
        },
        ready(){
            var vm=this;
            vm.getChatInfo();
            vm.intervalObj = setInterval(function(){
                vm.getChatInfo('',vm.time.end);
            },3000)
        }
    };

</script>
<style>
    .chat-page .msgSendBox{
        border-top: 1px solid #E4E4E6;
    }
    .chat-page .msgSendBox form input{
        padding: 0;
        margin: 0;
        border: 1px solid #E9E9EB;
        border-radius: .4rem;
        -webkit-appearance: none;
        width: 100%;
        height: 3rem;
        text-indent: .3rem;
    }
    .chat-page .msgSendBox-warper{
        padding: 1rem;
        background-color: #F4F3F7;
    }
    .chat-page .msgSendBox-warper label{
        margin-left: .5rem;
        padding: .5rem .8rem;
        color: #09f;
        /*background-color: #fff*/
    }

    .chat-page .msgContainer{
        margin: 1rem;
    }
    .chat-page .msgContainer li{
        margin-bottom: 1.5rem;
    }
    .msgBox{
        
    }
    .chat-page .msgPhoto span{
        display: inline-block;
        width: 4rem;
    }
    .chat-page .msgPhoto span img.imgCover{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }
    .msgContent{
    }
    .chat-page .msgContent .msg{
        background-color: #fff;
        padding: 1rem;
        max-width: 80%;
        position: relative;
        display: inline-block;
        border-radius: .5rem;
    }
    .chat-page .msgContent .msg:after{
        content: '';
        position: absolute;
        top: 1.2rem;
        border: .7rem solid transparent;
    }

    .chat-page .msgBox-from .msgPhoto span{
        padding-right: .5rem;
        text-align: left;
    }
    .chat-page .msgBox-to .msgPhoto span{
        padding-left: .5rem;
        text-align: right;
    }
    .chat-page .msgBox-from .msgContent .msg{
        margin-left: 1rem;
    }
    .chat-page .msgBox-from .msgContent .msg:after{
        left: -1.3rem;
        border-right-color: #fff;
    }
    .chat-page .msgBox-to .msgContent .msg{
        margin-right: 1rem;
    }
    .chat-page .msgBox-to .msgContent .msg:after{
        right: -1.3rem;
        border-left-color: #fff;
    }

    .chat-page .msgDate span{
        display: inline-block;
        padding: .3rem .6rem;
        background-color: #cdcdcd;
        color: #fff;
        margin: auto;
        margin-bottom:1rem;
        line-height: 1.2;
        border-radius: .6rem;;
    }
    .chat-page .loadHistory{
        text-align: center;
    }
    .chat-page .loadHistory a{
        display: inline-block;
        text-decoration: none;
        color: #44A7FF;
        background-color: #A6DCFA;
        border-radius: .6rem;
        padding: .5rem .8rem;
        margin: 1rem 0;
    }
    .chat-page .noHistoryRecord{
        color: #bbb;
        padding: .5rem;
        margin: 1rem 0;
        font-size: 1.3rem;
    }
</style>
