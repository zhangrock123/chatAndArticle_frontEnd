<template>
    <div id="app-container" class="editArticleType-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'文章类型管理'" :page-left="pageLeft" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
            <ul class="app-list app-list_grid no-radius font_15">
                <li v-for="type in typeList">
                    <div class="app-table">
                        <div class="app-table-full">
                            <span>
                                <span class="app-ellipsis-1">{{type.typeName}}</span>
                            </span>
                        </div>
                        <div class="text-center"><span class="pre btn-list"><a href="javascript:;" class="text-white bg-green" @click="$root.queryTo('editarticletypename',{id: type.typeId, name: type.typeName})"><i class="icon-edit"></i>编辑</a><a href="javascript:;" @click="deleteArticleType($index)" class="text-white bg-red"><i class="icon-trash-o"></i>删除</a></span></div>
                    </div>
                </li>
            </ul>
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
                pageRight: '创建',
                typeList: []
            }
        },
        components: {
            pageHeader,
        },
        computed: {
        },
        methods: {
           rightFn(){
                this.$root.queryTo('newarticletype');
           },
           getArticleTypeList(){
               var vm=this;
                var ld=loading();
                var param={
                    token: util.getStore('userToken')
                };
                vm.$root.service('recordTypeList', param, function(res){
                    ld.destroy();
                    vm.typeList=res.data || [];
                },function(){
                    ld.destroy();
                },function(){
                    ld.destroy();
                })
           },
           deleteArticleType(index){
                var vm=this;
                confirm('是否确认删除类型［'+vm.typeList[index].typeName+'］？', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            vm.deleteArticleTypeAction(index);
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消'){
                            this.destroy();
                        }
                    }
                });
           },
           deleteArticleTypeAction(index){
                var vm=this;
                var ld=loading();
                var param={
                    token: util.getStore('userToken'),
                    typeId: vm.typeList[index].typeId
                };
                vm.$root.service('deleteRecordType', param, function(res){
                    ld.destroy();
                    vm.typeList.splice(index, 1);
                    tip('删除成功');
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
            vm.getArticleTypeList();
        }
    };

</script>
<style>
    .editArticleType-page .btn-list a{
        display: inline-block;
        text-decoration: none;
        padding: .8rem 1.2rem;
        border-radius: .4rem;
        font-size: 1.4rem;
        line-height: 1.2;
        
    }
    .editArticleType-page .btn-list a i{
        font-size: 1.5rem;
        margin-right: .3rem;
    }
    .editArticleType-page .btn-list a:not(:last-child){
        margin-right: .8rem;
    }
</style>
