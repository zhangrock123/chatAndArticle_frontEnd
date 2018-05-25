<template>
    <div id="app-container" class="index-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'日志文章'" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
            <ul class="app-list app-list_board no-radius font_15" v-if="recordList.length">
                <li class="board-line" v-for="record in recordList" @click="$root.queryTo('articledetail', {id: record.recordId})">
                    <div class="recordOption">
                        <div class="recordTitle font_15 app-ellipsis">{{record.title}}</div>
                        <div class="recordContent font_12 app-ellipsis-2">{{record.content}}</div>
                        <div class="app-flex font_10">
                            <div class="recordType">{{record.typeName}}</div>
                            <div class="recordDate text-right">{{record.createTime}}</div>
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
       <footer id="app-footer">
             <page-footer :active-index="'1'"></page-footer>
        </footer>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    import pageFooter from '../components/pageFooter.vue';
    import loadMore from '../components/loadMore.vue';
    var util=require('../libs/util.js');
    export default {
		data() {
			return {
                pageRight:'创建',
                recordList:[],
                isLoadAll: true,
                page: 0
            }
        },
        components: {
            pageHeader,
            pageFooter,
            loadMore
        },
        computed: {
        },
        methods: {
            rightFn(){
                this.$root.queryTo('newarticle');
            },
            getRecordList(isLoadMore){
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
                return vm.$root.service('recordList', param, function(res){
                        !isLoadMore && ldm.destroy();
                        if (isLoadMore) {
                            vm.recordList = vm.recordList.concat(res.data);
                        } else {
                            vm.recordList= res.data || [];
                        }
                        vm.isLoadAll = +res.totalPage <= vm.page;
                    },function(){
                        !isLoadMore && ldm.destroy();
                    },function(){
                        !isLoadMore && ldm.destroy();
                    })
            },
            loadMoreList(){
                this.page++;
                return this.getRecordList(true);
            },
        },
        events:{
            
        },
        ready(){
            var vm=this;
            vm.getRecordList(false);
        }
    };

</script>
<style>
    .index-page .recordOption{

    }
    .index-page .recordTitle{
        color: #000;
    }
    .index-page .recordContent{
        color: #666;
        margin: .5rem 0 .8rem;
    }
    .index-page .recordType{
        color: #999;
    }
    .index-page .recordDate{
        color: #999;
    }
</style>
