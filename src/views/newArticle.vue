<template>
    <div id="app-container" class="newArticle-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'创建日志文章'" :page-left="pageLeft" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body">
                <div class="content-section">
                    <input type="text" class="article-title" placeholder="文章标题" v-model="articleInfo.title">
                </div>
                <div class="content-section">
                    <div class="app-table">
                        <div class="app-table-full">
                            <span>
                                <select name="" id="" class="article-type" v-model="articleInfo.typeId">
                                    <option :value="recordType.typeId" v-for="recordType in recordTypeList">{{recordType.typeName}}</option>
                                </select>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="javascript:;" class="createNewTypeBtn pre font_20" @click="$root.queryTo('newarticletype')"> <i class="icon-circle-plus"></i> </a>
                            </span>
                        </div>
                    </div>
                    
                </div>
                <div class="content-section">
                    <textarea name="" id="" cols="30" rows="10" class="article-content" placeholder="写点啥内容呢～" v-textarea-ctrl="articleInfo.content" v-model="articleInfo.content"></textarea>
                    <div>
                        <ul class="contentImg-list">
                            <li v-for="img in articleInfo.pic">
                                <i class="close icon-circle-cross"  @click="setImgList('', $index)"></i>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="{'backgroundImage': 'url('+img+')'}">
                            </li>
                            <li>
                                <a href="javascript:;" class="uploadContentImg">
                                    <i class="icon-plus2"></i>
                                    <vue-file-upload 
                                        :label="uploadConfig.label" 
                                        :files.sync = "files" 
                                        :url="uploadConfig.url" 
                                        :auto-upload="uploadConfig.autoUpload" 
                                        :filters="uploadConfig.filters" 
                                        :events="uploadConfig.events" 
                                        :request-options="uploadConfig.requestOptions"></vue-file-upload>
                                </a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>

        </section>
       
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
                pageRight: '发表',
                articleInfo:{
                    token:  util.getStore('userToken'),
                    title: '',
                    typeId: '0',
                    content: '',
                    pic: []
                },
                recordTypeList:[{typeName: '选择所属类型',  typeId: '0'}],
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
            setImgList(url, i){
                var vm=this;
                if(!isNaN(i)){
                  confirm('确定删除本图？', {
                      callBack: function(evt){
                          if(evt.target.innerHTML=='确定'){
                              vm.articleInfo.pic.splice(i, 1);
                          }
                          this.destroy();
                      }
                  });
                }else{
                  vm.articleInfo.pic.push(url);   
                }
            },
            getRecordType(){
                var vm=this;
                var ld=loading();
                vm.$root.service('recordTypeList', {token: util.getStore('userToken')}, function(res){
                    ld.destroy();
                    vm.recordTypeList=(res.data || []).concat(vm.recordTypeList);
                },function(){
                    ld.destroy();
                },function(){
                    ld.destroy();
                })
            },
            rightFn(){
                var vm=this;
                var checkParamStatus=vm.checkParam();
                if(!checkParamStatus.status) return tip(checkParamStatus.msg);
                confirm('确定发表本文章？', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            var ld=loading();
                            vm.$root.postAjax(config.apiHost + 'record.asp?action=createRecord', vm.articleInfo, function(res){
                                ld.destroy();
                                tip('文章发表成功');
                                window.history.go(-1);
                            },function(){
                                ld.destroy();
                            })
                        }
                        this.destroy();
                    }
                });
            },
            checkParam(){
                var vm=this;
                var res={status:false, msg:''};
                if(!vm.articleInfo.title){
                    res.msg="文章标题为空";
                    return res;
                }
                if(!vm.articleInfo.typeId || vm.articleInfo.typeId=="0"){
                    res.msg="请选择或添加文章类型名称";
                    return res;
                }
                if(!vm.articleInfo.content){
                    res.msg="文章内容为空";
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
            vm.getRecordType();
        }
    };

</script>
<style>
    .newArticle-page .content-section{
        background-color: #fff;
        padding: 1rem;
        margin-top: 1rem;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
    }
    .newArticle-page .article-title,
    .newArticle-page .article-content,
    .newArticle-page .article-type{
        width: 100%;
        -webkit-appearance: none;
        padding: 0;
        margin: 0;
        border-radius: 0;
        border: 0;
    }
    .newArticle-page .article-title{
        height: 3.8rem;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    .newArticle-page .article-content{
        font-size: 1.5rem;
    }
    .newArticle-page .article-type{
        font-size: 1.5rem;
    }
    .newArticle-page .createNewTypeBtn{
        text-decoration: none;
        color: #09f;
    }
    .newArticle-page .uploadContentImg{
        position: relative;
        display: inline-block;
        width: 5.8rem;
        height: 5.8rem;
        border: 1px solid #ccc;
        text-decoration: none;
        color: #ccc;
        text-align: center;
        
        overflow: hidden;
    }
    .newArticle-page .uploadContentImg i{
        position: absolute;
        width: 6rem;
        height: 6rem;
        left: 0;
        top: 0;
        font-size: 3.6rem;
        line-height: 6rem;
        font-weight: 100;
    }
    .newArticle-page .fileupload-button{
        /*position: absolute !important;*/
        left: 0;
        top: 0;
        width: 6rem;
        height: 6rem;
        padding: 0 !important;
        background-color: transparent !important;
    }
    .newArticle-page .contentImg-list li img{
        width: 100%;
        max-width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        vertical-align: middle;
    }
    .newArticle-page .contentImg-list{
        padding-top: 1rem;
        border-top: 1px solid #eee;

    }
    .newArticle-page .contentImg-list li{
        display: inline-block;
        position: relative;
        width: 6rem;
        height: 6rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        /*overflow: hidden;*/
    }
    .newArticle-page .contentImg-list i.close{
        position: absolute;
        right: -1rem;
        top: -1rem;
        font-size: 1.8rem;
        color: #333;
    }
</style>