<template>
    <div id="app-container" class="my-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'我的'" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
            <ul class="app-list app-list_grid no-radius font_15">
                <li class="userPhoto arrow" @click="$root.queryTo('myphoto', {'photo': myInfo.userPhoto || photo})">
                    <img class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="myInfo.userPhoto | noPhoto" alt="">
                    <div>
                        <div class="font_14">{{myInfo.userName}}</div>
                        <div class="font_13">{{myInfo.createTime}}</div>
                    </div>
                </li>
            </ul>
            <ul class="app-list app-list_grid no-radius font_15">
                <li>
                    <div class="app-table">
                        <div class="app-table-full">联系方式</div>
                        <div class="text-right text-highGray">{{myInfo.userPhone || '无'}}</div>
                    </div>
                </li>
                <li>
                    <div class="app-table">
                        <div class="app-table-full">邮箱</div>
                        <div class="text-right text-highGray">{{myInfo.userEmail || '无'}}</div>
                    </div>
                </li>
                <li class="text-highGray">
                    {{myInfo.userRemark || '无'}}
                </li>
            </ul>
            <ul class="app-list app-list_grid no-radius font_15">
                <li class="arrow" @click="$root.queryTo('editarticletype')">
                    <i class="icon-paper"></i>
                    管理文章类型
                </li>
                <li class="arrow" @click="$root.queryTo('changepassword')">
                    <i class="icon-lock2"></i>
                    设置密码
                </li>
            </ul>
            <ul class="app-list app-list_grid no-radius font_15">
                <li class="text-center">
                    <a href="javascript:;" class="loginOut" @click="loginOut()">退出登录</a>
                </li>
            </ul>
        </section>
       <footer id="app-footer">
             <page-footer :active-index="'3'"></page-footer>
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
                photo: '',
                pageRight:'<i class="icon-edit font_20"></i>',
                myInfo: {}
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
                this.$root.queryTo('infoedit');
            },
           loginOut(){
               var vm=this;
               confirm('是否退出登录？', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            util.removeStore('userToken');
                            vm.$root.queryTo('login');
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消'){
                            this.destroy();
                        }
                    }
                });
           },
           getMyInfo(){
                var vm=this,
                    param={
                        token: util.getStore('userToken')
                    },
                    ld=loading();
                vm.$root.service('myInfo', param, function(res){
                    ld.destroy();
                    vm.myInfo=res.data || {};
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
    .my-page .imgCover{
        width: 5rem;
        height: 5rem;
        vertical-align: top;
    }
    .my-page .userPhoto>div{
        display: inline-block;
        margin-left: .5rem;
    }
    .my-page .userPhoto>div div{
        height: 2.5rem;
        line-height: 2.5rem;
    }
    .my-page .userPhoto>div div:last-child{
        color: #999;
    }
    .my-page .loginOut{
        text-decoration: none;
        color: #f00;
        display: block;
    }
</style>