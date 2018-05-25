<template>
    <div id="app-container" class="login-page" v-height-ctrl="">
        <header id="app-header">
            <page-header :page-title="'注册'" :page-left="pageLeft" :page-right="pageRight" :left-fn="leftFn" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
           <div class="login-box" v-if="stepStatusCode==1">
               <div class="app-table">
                   <div>
                       <span>
                           <i class="icon-user font_18"></i>
                       </span>
                   </div>
                   <div class="app-table-full">
                       <span>
                           <input type="text" class="font_14 userinfo user-name" v-model="userInfo.userName" placeholder="5-10位用户名，字母或数字" maxlength="10">
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
                           <input type="password" class="font_14 userinfo user-password" v-model="userInfo.password" placeholder="5-10位密码，数组与字母组合" maxlength="10">
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
                           <input type="password" class="font_14 userinfo user-password" v-model="userInfo.passwordAgain" placeholder="重复密码" maxlength="10">
                       </span>
                   </div>
               </div>
           </div>
           <div class="photo-box text-center" v-if="stepStatusCode==2">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="{'backgroundImage': 'url('+userInfo.photo+')'}"  alt="" v-if="userInfo.photo">
                <a href="javascript:;" v-else>
                    <i class="icon-camera"></i>
                    
                </a>
                <vue-file-upload 
                        :label="uploadConfig.label" 
                        :files.sync = "files" 
                        :url="uploadConfig.url" 
                        :auto-upload="uploadConfig.autoUpload" 
                        :filters="uploadConfig.filters" 
                        :events="uploadConfig.events" 
                        :request-options="uploadConfig.requestOptions"></vue-file-upload>
            </div>
           <div class="login-box login-special-box" v-if="stepStatusCode==2">
               <div class="app-table">
                   <div>
                       <span>
                           <i class="icon-envelope font_18"></i>
                       </span>
                   </div>
                   <div class="app-table-full">
                       <span>
                           <input type="email" class="font_14 userinfo user-password" v-model="userInfo.email" placeholder="邮箱地址">
                       </span>
                   </div>
               </div>
               <div class="app-table">
                   <div>
                       <span>
                           <i class="icon-tablet font_22"></i>
                       </span>
                   </div>
                   <div class="app-table-full">
                       <span>
                           <input type="tel" class="font_14 userinfo user-password" v-model="userInfo.phone" placeholder="联系方式">
                       </span>
                   </div>
               </div>
               <div class="app-table">
                   <div>
                       <span>
                           <i class="icon-info-circle font_20"></i>
                       </span>
                   </div>
                   <div class="app-table-full">
                       <span>
                           <input type="text" class="font_14 userinfo user-password" v-model="userInfo.remark" placeholder="个人介绍">
                       </span>
                   </div>
               </div>
           </div>
           
           <div class="login-box" v-if="stepStatusCode==3">
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
          <div class="submit-box" v-if="stepStatusCode==1 || stepStatusCode==2">
              <button class="font_16" @click="nextStep()">下一步</button>
          </div>
          <div class="regist-btn text-right" v-if="stepStatusCode==2">
              <a href="#" class="font_14" @click="skipStep()">跳过这一步</a>
          </div>
          <div class="submit-box" v-if="stepStatusCode==3">
              <button class="font_16" @click="doRegist()">注册</button>
          </div>
        </section>
    </div>
</template>
<script>
    var VueFileUpload = require('vue-file-upload'),
        config = require('../config');
    import pageHeader from '../components/pageHeader.vue';
    export default {
		data() {
			return {
                pageLeft: '',
                pageRight: '登录',
                stepStatusCode: 1,
                verifyImgUrl: '',
                userInfo:{
                    userName: '',
                    password: '',
                    imgToken:'',
                    code:'',
                    photo:'',
                    remark:'',
                    email:'',
                    phone:'',
                    passwordAgain:''
                },
                uploadConfig:{
                    url: config.apiHost + 'upload.asp?action=uploadImg',
                    label: '',
                    autoUpload: true,
                    filters: [
                        {
                            name:"imageFilter",
                            fn(file){
                                var dict={
                                    type: '|jpg|png|jpeg|bmp|gif|',
                                    maxSize: 2*1024*1000
                                };
                                //图片限制
                                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                                if(dict.type.indexOf(type) == -1){
                                    return false;
                                }
                                //大小限制
                                if(file.size > dict.maxSize){
                                    return false;
                                }
                                return true;
                            }
                        }
                    ],
                    requestOptions:{
                        formData:{
                            // token:"0215C4E9-F0A7-4259-8719-67972B586105"
                        },
                        responseType:'json',
                        withCredentials:false
                    },
                    events:{
                        //图片上传成功后的回调方法，用于页面显示相应的上传的图片
                        onCompleteUpload:(file,response,status,header)=>{
                            if(response.success)
                                this.setImgList(response.data.url);
                            else
                                alert(response.errMsg);
                        },
                        onSuccessUpload:(a)=>{
                            console.log('onSuccessUpload')
                        },
                        onAddFileSuccess:(file)=>{
                            console.log('onAddFileSuccess');
                        },
                        //当页面图片格式或者文件太大的时候回调此方法
                        onAddFileFail:(file)=>{
                            var checkObj=this.verifyFile(file);
                            if(!checkObj.isImgFile()){
                                return alert('请图片格式不合法～');
                            }
                            if(!checkObj.isInSize()){
                                return alert('图片太大了～');
                            }
                        },
                        onAbortUpload:()=>{
                            console.log('onAbortUpload')
                        }
                    }
                },
            }
        },
        components: {
            pageHeader,
            VueFileUpload
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
            verifyFile(file){
                var dict={
                    type: '|jpg|png|jpeg|bmp|gif|',
                    maxSize: 2*1024*1000
                };
                return {
                    isImgFile: function(){
                        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return (dict.type.indexOf(type) !== -1);
                    },
                    isInSize: function(){
                        return file.size <= dict.maxSize
                    }
                }
            },
            setImgList(url){
                this.userInfo.photo=url;
            },
            leftFn(){
                if(this.stepStatusCode > 1){
                    this.stepStatusCode--;
                }
                if(this.stepStatusCode == 1){
                    this.pageLeft='';
                }
            },
            rightFn(){
                this.$root.queryTo('login',{});
            },
            nextStep(){
                var vm=this;
                var step=vm.stepStatusCode;
                var res={};
                if(step==1){
                    res=vm.checkStepOne();
                }
                if(step==2){
                    res=vm.checkStepTwo();
                }
                if(!res.status){
                    return tip(res.msg);
                }
                vm.stepStatusCode++;
                if(vm.stepStatusCode >= 1){
                    vm.pageLeft='<i class="icon-arrow-left2 font_22"></i>';
                }
            },
            skipStep(){
                this.stepStatusCode++;
            },
            checkStepOne(){
                var vm=this;
                var reg={
                    userName: /^[0-9A-Za-z]{5,10}$/,
                    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,10}$/
                };
                var res={status:false, msg: ''};
                if(!vm.userInfo.userName){
                    res.msg='用户名不能为空';
                    return res;
                }
                if(!reg.userName.test(vm.userInfo.userName)){
                    res.msg='5-10位用户名，字母或数字';
                    return res;
                }
                if(!vm.userInfo.password){
                    res.msg='密码不能为空';
                    return res;
                }
                if(!reg.password.test(vm.userInfo.password)){
                    res.msg='5-10位密码，数组与字母组合';
                    return res;
                }
                if(!vm.userInfo.passwordAgain){
                    res.msg='重复密码不能为空';
                    return res;
                }
                if(vm.userInfo.password!=vm.userInfo.passwordAgain){
                    res.msg='两次密码不一致';
                    return res;
                }
                res.status=true;
                return res;
            },
            checkStepTwo(){
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
            checkStepThree(){
                var vm=this;                
                var res={status:false, msg: ''};
                if(!vm.userInfo.code){
                    res.msg='验证码不能为空';
                    return res;
                }
                res.status=true;
                return res;
            },
            doRegist(){
                var vm=this;
                var res={};
                res=vm.checkStepOne();
                if(!res.status){
                    return tip(res.msg);
                }
                res=vm.checkStepTwo();
                if(!res.status){
                    return tip(res.msg);
                }
                res=vm.checkStepThree();
                if(!res.status){
                    return tip(res.msg);
                }
                var param=vm.userInfo;
                delete param.passwordAgain;
                var ld=loading();
                vm.$root.service('regist', param, function(){
                    ld.destroy();
                    tip('注册成功');
                    vm.$root.queryTo('login');
                },function(){
                    ld.destroy();
                })
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
    .login-box{
        width: 80%;
        margin: auto;
        background-color: rgba(255,255,255,.8);
        border-radius: .4rem;
        margin-top: 30%;
    }
    .login-box>div:not(:last-child){
        border-bottom: 1px solid #dadada;
    }
    .userinfo{
        -webkit-appearance: none;
        width: 100%;
        border: 0;
        margin: 0;
        padding: 0;
        height: 5.5rem;
        background-color: transparent;
        border-radius: 0;
    }
   .login-box>div i{
       margin: 0 1rem 0 2rem;
       color: #999;
   }
   .login-box>div img{
       margin-right: 2rem;
   }
   .login-box .app-table span{
       display: inline-block;
   }
   
   .submit-box{
        width: 80%;
        margin: auto;
   }
   .submit-box button{
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
   .regist-btn{
        width: 80%;
        margin: auto;
        margin-top: 1rem;
   }
   .regist-btn a{
       color:#fff;
   }

   .photo-box{
       margin: 18% auto auto;
       width: 7rem;
       height: 7rem;
       border: 1px solid #fff;
       border-radius: 50%;
       position: relative;
   }
   .photo-box a{
       display: block;
       text-decoration: none;
       font-size: 3rem;
       line-height: 7rem;
       color: #fff;
       width: 7rem;
       height: 7rem;
       margin: 1px;
       
       /*line-height: 1.4;*/
   }
   .photo-box img{
        width: 100%;
        max-width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
        vertical-align: middle;
   }
   .login-special-box{
       margin-top:3rem;
   }
   .login-page .fileupload-button{
        position: absolute !important;
        left: 0;
        top: 0;
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        padding: 0 !important;
        background-color: transparent !important;
    }
</style>
