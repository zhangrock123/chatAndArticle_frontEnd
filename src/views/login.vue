<template>
    <div id="app-container" class="login-page" v-height-ctrl="">
        <section id="app-body">
           <div class="login-box">
               <div class="app-table">
                   <div>
                       <span>
                           <i class="icon-user font_18"></i>
                       </span>
                   </div>
                   <div class="app-table-full">
                       <span>
                           <input type="text" class="font_14 userinfo user-name" v-model="userInfo.userName" placeholder="输入用户名" maxlength="10">
                       </span>
                   </div>
               </div>
               <div class="app-table">
                   <div>
                       <span>
                           <i class="icon-lock font_22"></i>
                       </span>
                   </div>
                   <div class="app-table-full">
                       <span>
                           <input type="password" class="font_14 userinfo user-password" v-model="userInfo.password" placeholder="输入密码" maxlength="10">
                       </span>
                   </div>
               </div>
               <div class="app-table">
                   <div>
                       <span>
                           <i class="icon-question-circle-o font_20"></i>
                       </span>
                   </div>
                   <div class="app-table-full">
                       <span>
                            <input type="number" class="font_14 userinfo" v-model="userInfo.code" placeholder="验证码" maxlength="5">                           
                       </span>
                   </div>
                   <div>
                       <span>
                           <img :src="verifyImgUrl" alt="" @click="getVerifyImg()">
                       </span>
                   </div>
               </div>
           </div>
          <div class="submit-box">
              <button  class="font_16" @click="doLogin()">立即登陆</button>
          </div>
          <div class="regist-btn text-right">
              <a href="javascript:;" class="font_14" @click="$root.queryTo('regist')">注册账号</a>
          </div>
        </section>
    </div>
</template>
<script>
    var config = require('../config'),
        util=require('../libs/util.js');
    export default {
		data() {
			return {
                verifyImgUrl: '',
                userInfo:{
                    userName: '',
                    password: '',
                    imgToken: '',
                    code: ''
                }
            }
        },
        components: {
        },
        computed: {
        },
        methods: {
            getImgToken(){
                var vm=this;
                var ld=loading();
                vm.$root.service('imageToken', {}, function(res){
                    ld.destroy();
                    vm.userInfo.imgToken=res.data.token;
                    vm.getVerifyImg();
                },function(){
                    ld.destroy();
                })
            },
            getVerifyImg(){
                var vm=this;
                if(!vm.userInfo.imgToken){
                   return vm.getImgToken();
               }
                vm.verifyImgUrl=config.apiHost+"verify.asp?action=image&token="+vm.userInfo.imgToken+"&rnd="+Math.random()*10;
            },
            doLogin(){
                var vm=this;
                var checkParamStatus=vm.checkParam();
                if(!checkParamStatus.status) return tip(checkParamStatus.msg);
                var ld=loading();                
                vm.$root.service('login', vm.userInfo, function(res){
                    util.setStore('userToken', res.data.userToken);
                    ld.destroy();
                    vm.$root.queryTo('chathistory');
                },function(){
                    ld.destroy();
                })
            },
            checkParam(){
                var vm=this;
                var res={status: false, msg:''};
                if(!vm.userInfo.userName){
                    res.msg='用户名不能为空';
                    return res;
                }
                if(!vm.userInfo.password){
                    res.msg='密码不能为空';
                    return res;
                }
                if(!vm.userInfo.code){
                    res.msg='验证码不能为空';
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
            vm.getImgToken();
        }
    };

</script>
<style>
    .login-page{
        background-image: url(../assets/images/bg-main.jpg);
        background-size: cover;
    }
    .login-page .login-box{
        width: 80%;
        margin: auto;
        background-color: rgba(255,255,255,.8);
        border-radius: .4rem;
        margin-top: 30%;
    }
    .login-page .login-box>div:not(:last-child){
        border-bottom: 1px solid #dadada;
    }
    .login-page .userinfo{
        -webkit-appearance: none;
        width: 100%;
        border: 0;
        margin: 0;
        padding: 0;
        height: 5.5rem;
        background-color: transparent;
        border-radius: 0;
    }
   .login-page .login-box>div i{
       margin: 0 1rem 0 2rem;
       color: #999;
   }
   .login-page .login-box>div img{
       margin-right: 2rem;
   }
   .login-page .login-box .app-table span{
       display: inline-block;
   }
   
   .login-page .submit-box{
        width: 80%;
        margin: auto;
   }
   .login-page .submit-box button{
       display: block;
       width:100%;
       background-color: #09f;
       border: 0;
       margin: 0;
       margin-top: 2rem;
       padding: 0 1.3rem;
       height: 4.6rem;
       color: #fff;
       border-radius: .4rem;
       opacity: .8
   }
   .login-page .regist-btn{
        width: 80%;
        margin: auto;
        margin-top: 1rem;
   }
   .login-page .regist-btn a{
       color:#fff;
   }
</style>
