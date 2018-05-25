<template>
    <div id="app-container" class="myphoto-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'我的头像'" :page-left="pageLeft" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
            <div class="app-table">
                <div>
                    <img :src="photo" alt="" class="myphoto">
                </div>
            </div>
        </section>
        <vue-file-upload 
                :label="uploadConfig.label" 
                :files.sync = "files" 
                :url="uploadConfig.url" 
                :auto-upload="uploadConfig.autoUpload" 
                :filters="uploadConfig.filters" 
                :events="uploadConfig.events" 
                :request-options="uploadConfig.requestOptions" v-el:upload-dom style="display:none"></vue-file-upload>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    var VueFileUpload = require('vue-file-upload'),
        config = require('../config'),
        util=require('../libs/util.js');
    export default {
		data() {
			return {
                pageLeft:'<i class="icon-arrow-left2 font_22"></i>',    
                pageRight: '<i class="icon-camera2 font_20"></i>',
                photo: this.$route.query.photo || null,
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
                        },
                        responseType:'json',
                        withCredentials:false
                    },
                    events:{
                        //图片上传成功后的回调方法，用于页面显示相应的上传的图片
                        onCompleteUpload:(file,response,status,header)=>{
                            if(response.success)
                                this.changeMyPhoto(response.data.url);
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
            rightFn(){
               this.$els.uploadDom.getElementsByTagName('INPUT').item(0).click();
            },
            changeMyPhoto(url){
                var vm=this;
                if(!url) return tip('头像图片为空');
                var ld=loading(),
                    param={
                        token: util.getStore('userToken'),
                        photoUrl: url
                    };
                vm.$root.service('changePhoto', param, function(res){
                    ld.destroy();
                    vm.photo=url;
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
<style>
    .myphoto-page #app-body{
        background-color: #333;
    }
    .myphoto-page .app-table{
        height: 100%;
    }
    .myphoto-page .myphoto{
        width: 100%;
        vertical-align: middle;
    }
</style>
