<style>
    #app-header .header{
        position: relative;
        /*background-color: #09f;*/
        padding: 0 1rem;
    }
    #app-header .header .header-left{
        line-height: 4.6rem;
        padding-right: 1.3rem;
        font-size: 1.8rem;
        text-decoration: none;
    }
    #app-header .header .header-right{
        padding-left: 1.3rem;
        text-decoration: none;
    }
    #app-header .header .header-title {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        text-align: center;
        z-index: 2;
        pointer-events: none;
        font-size: 1.8rem;
    }
    #app-header .header .header-left:empty,
    #app-header .header .header-right:empty{
        padding: 0;
    }
    #app-header .header .header-title span{
        margin: 0 2.5rem;
    }
</style>
<template>
    <div class="header">
        <a href="javascript:;" class="text-white header-left pull-left" @click="leftClickFn()" v-if="isShowLeft">
            {{{pageLeft}}}
        </a>
        <a href="javascript:;" class="text-white font_16 header-right pull-right" @click="rightClickFn()" v-if="isShowRight">
            {{{pageRight}}}
        </a>
        <div class="text-white font_18 header-title">
            <span class="app-ellipsis-1">{{pageTitle}}</span>
        </div>
    </div> 
</template>
<script>
    export default {
        props:['pageTitle','pageLeft','pageRight','leftFn','rightFn','init'],
		data() {
			return {
                isShowLeft: true,   //是否显示返回箭头
                isShowRight: true
            };
		},
        methods:{
            //左侧箭头的点击事件(如果是微信环境，调用微信的返回事件)
            leftClickFn(){
                var vm=this;
                if(!vm.pageLeft) return;
                if(vm.leftFn){
                    return vm.leftFn(vm);
                }else{
                    if(1 >= window.history.length){
                        if(vm.isWeiXinEnv())
                            return WeixinJSBridge.call('closeWindow');
                    }else{
                        return window.history.go(-1);
                    }
                }   
            },
            //右侧文字的点击事件
            rightClickFn(){
                var vm=this;
                if(!vm.pageRight) return;
                vm.rightFn && vm.rightFn(vm);
            },
            //初始化本component的事件
            initPage(){
                var vm=this;
                vm.init && vm.init(vm);
            },
            //判断是否在微信环境
            isWeiXinEnv(){
                var _res=false;
                try{
                    _res=!!WeixinJSBridge;
                }catch(e){}
                return _res;
            }
        },
        ready(){
            this.initPage();
        }
    };

</script>