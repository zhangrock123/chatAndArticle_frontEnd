<template>
    <div id="app-container" class="newArticleType-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="pageTitle" :page-left="pageLeft" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
            <ul class="app-list app-list_board no-radius font_15" style="margin-top:2rem">
                    <li class="">
                        <input type="text" class="list-input" placeholder="类型名称" v-model="typeName">
                    </li>
                </ul>
        </section>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    var util=require('../libs/util.js');
    export default {
        props:['isEdit','id','name'],
		data() {
			return {
                pageLeft:'<i class="icon-arrow-left2 font_22"></i>',
                pageRight: this.isEdit?'编辑':'创建',
                typeName: this.name || '',
                pageTitle:this.isEdit?'编辑类型':'创建新类型',
            }
        },
        components: {
            pageHeader,
        },
        computed: {
        },
        methods: {
           rightFn(){
                var vm=this;
                if(!vm.typeName) return tip('类型名称不能为空');
                var confirmTip=vm.isEdit?'是否编辑该类型？':'是否创建该类型？';
                confirm(confirmTip, {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            vm.articleTypeAction();
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消'){
                            this.destroy();
                        }
                    }
                });
           },
           articleTypeAction(){
               var vm=this;
               var setting={
                   serviceName: vm.isEdit?'updateRecordType':'createRecordType',
                   param:{
                       token: util.getStore('userToken'), 
                       name: vm.typeName
                   },
                   tipContent: vm.isEdit?'类型编辑成功':'类型创建成功'
               };
               if(vm.isEdit){
                   setting.param.typeId=vm.id;
               }
                var ld=loading();
                vm.$root.service(setting.serviceName, setting.param, function(){
                    ld.destroy();
                    tip(setting.tipContent);
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
        }
    };

</script>
