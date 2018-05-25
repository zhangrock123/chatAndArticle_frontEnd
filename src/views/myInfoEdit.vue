<template>
    <div id="app-container" class="infoEdit-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'信息修改'" :page-left="pageLeft" :page-right="'确定'" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
           <ul class="app-list app-list_grid no-radius font_15">
                <li>
                    <div class="app-table">
                        <div class="app-table-full">联系方式</div>
                        <div class="text-right text-highGray">
                            <input type="tel" class="inputElement text-right" placeholder="手机号码" v-model="userInfo.phone">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="app-table">
                        <div class="app-table-full">邮箱</div>
                        <div class="text-right text-highGray">
                            <input type="email" class="inputElement text-right" placeholder="邮箱地址" v-model="userInfo.email">
                        </div>
                    </div>
                </li>
                <li class="text-highGray">
                    <textarea name="" id="" cols="30" rows="10" class="inputElement" v-textarea-ctrl="userInfo.remark" v-model="userInfo.remark" placeholder="介绍一下自己吧~"></textarea>
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
                userInfo:{
                    email: '',
                    phone: '',
                    remark: ''
                }        
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
                var checkStatus=vm.checkParam();
                if(!checkStatus.status) return tip(checkStatus.msg);
                confirm('是否提交信息修改？', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            vm.editMyInfo();
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消'){
                            this.destroy();
                        }
                    }
                });
            },
            checkParam(){
                var vm=this;
                var reg={
                    email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
                    phone: /^1[34578]\d{9}$/
                };
                var res={status:false, msg: ''};
                if(vm.userInfo.email && !reg.email.test(vm.userInfo.email)){
                    res.msg='邮箱格式不正确';
                    return res;
                }
                if(vm.userInfo.phone && !reg.phone.test(vm.userInfo.phone)){
                    res.msg='电话格式不正确';
                    return res;
                }
                res.status=true;
                return res;
            },
            editMyInfo(){
                var vm=this;
                var param={
                    token: util.getStore('userToken')
                };
                param=util._extend(param, vm.userInfo);
                var ld=loading();
                vm.$root.service('changeMyInfo', param, function(res){
                    ld.destroy();
                    tip('信息修改成功');
                    window.history.go(-1);
                },function(){
                    ld.destroy();
                },function(){
                    ld.destroy();
                })
            },
            getMyInfo(){
                var vm=this;
                var param={
                    token: util.getStore('userToken')
                };
                var ld=loading();
                vm.$root.service('myInfo', param, function(res){
                    ld.destroy();
                    vm.userInfo.email=res.data.userEmail || '';
                    vm.userInfo.phone=res.data.userPhone || '';
                    vm.userInfo.remark=res.data.userRemark || '';
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
            vm.getMyInfo();
        }
    };

</script>
<style>
    .infoEdit-page{}
    .infoEdit-page .inputElement{
        padding:0;
        margin:0;
        -webkit-appearance: none;
        border:0;
    }
    .infoEdit-page textarea.inputElement{
        width: 100%;
    }
</style>
