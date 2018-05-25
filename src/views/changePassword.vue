<template>
    <div id="app-container" class="changPssword-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'设置密码'" :page-left="pageLeft" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
            <ul class="app-list app-list_grid no-radius font_15">
                <li>
                    <div class="app-table">
                        <div class="app-table-full">原密码</div>
                        <div class="text-right text-highGray">
                            <input type="password" class="text-right" placeholder="原密码" v-model="userInfo.oldPassword" maxlength="10">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="app-table">
                        <div class="app-table-full">新密码</div>
                        <div class="text-right text-highGray">
                            <input type="password" class="text-right" placeholder="5-10位密码，数组与字母组合" v-model="userInfo.newPassword" maxlength="10">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="app-table">
                        <div class="app-table-full">重复密码</div>
                        <div class="text-right text-highGray">
                            <input type="password" class="text-right" placeholder="5-10位密码，数组与字母组合" v-model="userInfo.repeatPassword" maxlength="10">
                        </div>
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
                pageRight: '确定',
                userInfo:{
                    oldPassword: '',
                    newPassword: '',
                    repeatPassword: ''
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
                var checkStatus=vm.checkSubmitData();
                if(!checkStatus.status) return tip(checkStatus.msg);
                confirm('是否确认修改密码？', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            vm.changePassword();
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消'){
                            this.destroy();
                        }
                    }
                });
            },
            changePassword(){
                var vm=this;
                var param={
                    token: util.getStore('userToken'),
                    oldPassword: vm.userInfo.oldPassword,
                    newPassword: vm.userInfo.newPassword
                };
                var ld=loading();
                vm.$root.service('changePassword', param, function(res){
                    ld.destroy();
                    tip('修改密码成功～');
                    window.history.go(-1);
                },function(){
                    ld.destroy();
                },function(){
                    ld.destroy();
                })
            },
            checkSubmitData(){
                var vm=this;
                var res={status: false, msg: ''};
                var reg={
                    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,10}$/
                };
                if(!vm.userInfo.oldPassword){
                    res.msg='原密码不能为空～';
                    return res;
                }
                if(!vm.userInfo.newPassword){
                    res.msg='新密码不能为空～';
                    return res;
                }
                if(!reg.password.test(vm.userInfo.newPassword)){
                    res.msg='新密码要求，5-10位密码，数组与字母组合';
                    return res;
                }
                if(!vm.userInfo.repeatPassword){
                    res.msg='重复密码不能为空～';
                    return res;
                }
                if(vm.userInfo.newPassword != vm.userInfo.repeatPassword){
                    res.msg='新密码与重复密码不一致～';
                    return res;
                }
                res.status=true;
                return res;
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
    .changPssword-page input{
        -webkit-appearance: none;
        border: none;
        padding: 0;
        margin: 0;
        margin-right: .3rem;
        width: 22rem;
    }
</style>