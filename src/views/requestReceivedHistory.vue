<template>
    <div id="app-container" class="requestHistory-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'收到的好友请求'" :page-left="pageLeft"></page-header>
        </header> 
        <section id="app-body">
            <ul class="requestList" v-if="requestList.length">
                <li v-for="request in requestList">
                    <div class="requestCard">
                        <div class="app-table">
                            <div>
                                <span>
                                    <img class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="request.userPhoto | noPhoto" alt="">
                                </span>
                            </div>
                            <div class="app-table-full">
                                <span class="font_14">
                                    <div class="app-ellipsis-1">{{request.userName}}</div>
                                    <div class="app-ellipsis-1 text-gray font_12">手机号: <span class="text-lightGray">{{request.userPhone || '无'}}</span></div>
                                    <div class="app-ellipsis-1 text-gray font_12">邮箱: <span class="text-lightGray">{{request.userEmail || '无'}}</span></div>
                                </span>
                            </div>
                        </div>
                        <div class="request-content font_14">
                            留言：<span class="text-highGray">{{request.content || '无'}}</span>
                        </div>
                        <div class="font_14">
                            状态：<span>{{{request.status | requestStatus}}}</span>
                        </div>
                        <div class="request-date font_12 text-lightGray text-right">
                            {{request.requestTime}}
                        </div>
                        <div class="request-btn" v-if="request.status ==1">
                            <div class="app-flex">
                                <div>
                                    <a href="javascript:;" class="acceptBtn" @click="requestAction(request, 1)">接受</a>
                                </div>
                                <div>
                                    <a href="javascript:;" class="rejectBtn" @click="requestAction(request, 2)">拒绝</a>
                                </div>
                            </div>
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
            <load-more :load-more-method="loadMoreList" :is-load-all="isLoadAll"></load-more>
        </section>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    import loadMore from '../components/loadMore.vue';
    var util=require('../libs/util.js');
    export default {
		data() {
			return {
                pageLeft:'<i class="icon-arrow-left2 font_22"></i>',
                requestList: [],
                isLoadAll: true,
                page: 0
            }
        },
        components: {
            pageHeader,
            loadMore
        },
        computed: {
        },
        methods: {
           getReceivedRequestList(isLoadMore){
               var vm=this, ldm=null;  
               if (!isLoadMore) {
                    ldm = loading();
                    vm.page = 1;
                } 
                var param={
                    token: util.getStore('userToken'),
                    page: vm.page,
                    limit: 10
                };
               return vm.$root.service('receivedHistory', param, function(res){
                    !isLoadMore && ldm.destroy();
                    if (isLoadMore) {
                        vm.requestList = vm.requestList.concat(res.data);
                    } else {
                        vm.requestList= res.data || [];
                    }
                    vm.isLoadAll = +res.totalPage <= vm.page;
                },function(){
                    !isLoadMore && ldm.destroy();
                },function(){
                    !isLoadMore && ldm.destroy();
                })
           },
           requestAction(request, actionType){
               var vm=this;
               var tips=actionType==1?'添加':'拒绝';
               var actionName=actionType==1?'acceptRequest':'rejectRequest';
               confirm('确认'+tips+'该好友请求？', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            var param={
                                token: util.getStore('userToken'),
                                requestId: request.requestId
                            };
                            var ld=loading();
                            vm.$root.service(actionName, param, function(res){
                                ld.destroy();
                                tip(tips+'好友成功～');
                                vm.getReceivedRequestList()
                            },function(){
                                ld.destroy();
                            },function(){
                                ld.destroy();
                            })
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消'){
                            this.destroy();
                        }
                    }
                });
           },
           loadMoreList(){
                this.page++;
                return this.getReceivedRequestList(true);
            },
        },
        events:{
            
        },
        ready(){
            var vm=this;
            vm.getReceivedRequestList(false);
        }
    };

</script>
<style>
      .requestHistory-page{
          
      }
      .requestHistory-page .imgCover{
        width: 6rem;
        height: 6rem;
        vertical-align: top;
        border-radius: .2rem;
    }
    .requestHistory-page .requestCard .app-table>div:first-child span{
        display: inline-block;
        width: 7rem;
    }
    .requestHistory-page .requestCard>div div{
        height: 2rem;
    }
    .requestHistory-page .requestList li{
        margin: 1rem;
        background-color: #fff;
        padding: 1rem;
        border-radius: .4rem;
        border: 2px dotted #eee;
    }
    .requestHistory-page .request-content{
        padding: 1rem 0;
        margin-top: 1rem;
        border-top: 1px dotted #eee;
    }
    .requestHistory-page .request-btn{
        padding: 2rem 0 2rem;
        margin-top: 1rem;
        border-top: 1px dotted #eee;
    }
    .requestHistory-page .acceptBtn,.rejectBtn{
        text-decoration: none;
        display: block;
        text-align: center;
        border-radius: 0.4rem;
        font-size: 1.6rem;
        width: 75%;
        margin: auto;
        height: 3.2rem;
        line-height: 3.2rem;
        border-width: 1px;
        border-style: solid;
    }
    .requestHistory-page .acceptBtn{
        border-color: #35aa47;
        color: #35aa47;
    }
    .requestHistory-page .rejectBtn{
        border-color: #ff6c6c;
        color: #ff6c6c;
    }
</style>
