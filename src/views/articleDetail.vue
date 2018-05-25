<template>
    <div id="app-container" class="articleDetail-page" v-height-ctrl="">
       <header id="app-header">
            <page-header :page-title="'文章详情'" :page-left="pageLeft" :page-right="pageRight" :right-fn="rightFn"></page-header>
        </header> 
        <section id="app-body" class="bg-white">
            <div class="article-container">
                <h4 class="article-title font_20">{{articleInfo.title}}</h4>
                <div class="article-date font_14 text-highGray">
                    {{articleInfo.createTime}}
                    <span>{{articleInfo.typeName}}</span>
                </div>
                <div class="slider" v-if="articleInfo.pics && articleInfo.pics.length">
                    <div class="img_prev_view">
                        <div class="slider-wrap" v-slider-swipe="articleInfo.pics">
                            <ul>
                                <li v-for="articlePic in articleInfo.pics">
                                    <a href="javascript:;">
                                        <img class="articleImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="{'backgroundImage': 'url('+articlePic.picUrl+')'}" data-image="{{articlePic.picUrl}}?imageView/0/w/640" />
                                    </a>
                                </li>
                            </ul>
                            <div class="slider-indicate font_13"></div>
                        </div>
                    </div>
                </div>
                <pre class="article-content font_15">{{articleInfo.content}}</pre>
            </div>
        </section>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    var util=require('../libs/util.js');
    var widgetImgPreview = require('../libs/widget-imagePreview.js');
    export default {
		data() {
			return {
                pageLeft:'<i class="icon-arrow-left2 font_22"></i>',
                pageRight:'<i class="icon-trash-o font_20"></i>',     
                id: this.$route.query.id || null, 
                articleInfo: {},
                widgetImgPreview:''      
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
                confirm('是否删除本文章？', {
                    callBack: function(evt){
                        if(evt.target.innerHTML=='确定'){
                            vm.deleteArticle();
                        }
                        if(evt.target.innerHTML=='确定' || evt.target.innerHTML=='取消')
                            this.destroy();
                    }
                });
           },
           getArticleInfo(){
                var vm=this;
                var ld=loading(),
                    param={
                        token: util.getStore('userToken'),
                        recordId: vm.id
                    };
                vm.$root.service('recordDetail', param, function(res){
                    ld.destroy();
                    vm.articleInfo=res.data || {};
                    vm.imgPreviewInit();
                },function(){
                    ld.destroy();
                },function(){
                    ld.destroy();
                })
           },
           deleteArticle(){
                var vm=this;
                var ld=loading(),
                    param={
                        token: util.getStore('userToken'),
                        recordId: vm.id
                    };
                vm.$root.service('deleteRecord', param, function(res){
                    ld.destroy();
                    tip('删除成功');
                    window.history.go(-1);
                },function(){
                    ld.destroy();
                },function(){
                    ld.destroy();
                })
           },
           //初始化大图预览
            imgPreviewInit(){
                var vm=this;
                vm.$nextTick(function(){
                    require(['../libs/widget-swipe.js'],function(Swiper){
                        vm.widgetImgPreview = new widgetImgPreview({ swiper: Swiper });
                        vm.widgetImgPreview.init();
                    });
                })
            },
        },
        events:{
            
        },
        ready(){
            var vm=this;
            if(!vm.id){
                return window.history.go(-1);
            }
            vm.getArticleInfo();
        }
    };

</script>
<style>
       .articleDetail-page .article-container{
           padding:1rem;
       }
       .articleDetail-page .article-title{
           padding: 0;
           margin: 0;
           font-weight:500;
       }
        .articleDetail-page .img_prev_view{
            /*margin-top: -4.4rem;*/
            position: relative;
        }
        .articleDetail-page .slider-wrap,
        .articleDetail-page .slider-wrap img {
            height: 31rem;
        }
        .articleDetail-page img.articleImg{
            width: 100%;
            max-width: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .articleDetail-page .slider .slider-indicate{
            position: absolute;
            bottom: 0;
            right: 1.3rem;
            width: 100%;
            height: 3rem;
            z-index: 3;
            text-align: right;
            pointer-events: none;
            color: #fff;
        }
        .articleDetail-page .widget-preview-indicate{
            height: 2rem;
            color: #fff;
            font-size: 1.3rem;
            text-align: right !important;
            right: 1.3rem;
        }
       .articleDetail-page .article-date{
           margin: .5rem 0 2rem;
       }
       .articleDetail-page .article-date span{
           color:#09f;
           padding-left:.5rem;
       }
       .articleDetail-page .article-content{
            line-height:1.6;
            font-family: "思源黑体", "Microsoft YaHei", "微软雅黑", "MicrosoftJhengHei", "华文细黑", "Helvetica", "Arial", "sans-serif";
           white-space: pre-wrap!important;
           word-wrap: break-word!important;
       }
</style>
