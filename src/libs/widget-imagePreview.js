module.exports =(function(){
    var widgetImgPreview=function(settings){
        this.Swiper = settings.swiper || null;
    };
    widgetImgPreview.prototype.init=function(){
        var self=this;
        var imgsObj = {}, groupObj = {} , groupId = 1000, et = null, current;
        var imgPreviewBoxes=document.getElementsByClassName('img_prev_view');
        var dom=null;
        var childNodes=null;
        for(var i=0,len=imgPreviewBoxes.length;i < len;i++){
            dom=imgPreviewBoxes[i];
            groupObj = {};
            groupId += 1;
            imgsObj[groupId] = [];
            (function(groupId){
                dom.onclick=function(evt){
                    et = evt.target;
                    if ("IMG" == et.tagName) {
                        if (/^data:image/.test(et.src)) {
                            current = et.getAttribute("data-image");
                        } else {
                            current = et.src;
                        }
                        if (typeof window.WeixinJSBridge != 'undefined') {
                            WeixinJSBridge.invoke('imagePreview', {'current': current, 'urls': imgsObj[groupId]});
                        } else {
                            self.previewImage({'current': current, 'urls': imgsObj[groupId]});
                        }
                    }
                }
                childNodes=dom.getElementsByTagName('img');
                
                for(var j=0,len=childNodes.length;j < len;j++){
                     if("IMG" == childNodes[j].tagName){
                        var dataImg = childNodes[j].getAttribute("data-image")||childNodes[j].src;
                        groupObj[dataImg] = dataImg;
                     }
                }
                //数组去重复
                imgsObj[groupId] = Object.keys(groupObj);
            })(groupId);
        }
    }
    

    widgetImgPreview.prototype.previewImage=function(options) {
        options = options || {};
        var ulHtml = [],
            urls = options.urls || [],
            currIndex = urls.lastIndexOf(options.current),
            winH = window.innerHeight;
        var paginationBox=null;
        urls.forEach(function (url) {
            // ulHtml.push('<div style="height:'+ winH +'px;" class="img-wrap swiper-slide"><img src="' + url + '"></div>');
            ulHtml.push('<li><div style="height:'+ winH +'px;" class="img-wrap"><img src="' + url + '"></div></li>');
        });
        ulHtml = ulHtml.join('');
        //console.log(ulHtml);
        dialog("", {
            // TPL: '<div style="z-index:{zIndex2};" class="widget-preview swiper-container"><div class="swiper-wrapper">' + ulHtml + '</div><div class="widget-preview-indicate swiper-pagination"></div></div>',
            TPL: '<div style="z-index:{zIndex2};" class="widget-preview"><ul>' + ulHtml + '</ul><div class="widget-preview-indicate"></div></div>',
            classes:'dialog-preview-widget',
            clickFn: function() {
                this.destroy();
                // if(paginationBox)
                //     paginationBox.innerHTML="";
            }
        }).open();
        // 渲染Swipe
        var allPages=urls.length;
        var indicateDom=null;
        new this.Swiper(document.getElementsByClassName('widget-preview')[0],{
            // initialSlide: 0,
            // loop: false,
            // onInit: function(){
            //     paginationBox=document.getElementsByClassName('swiper-pagination')[0];
            // }
            speed: 500,
            startSlide: currIndex,
            onInit:function(){
                indicateDom=document.getElementsByClassName('widget-preview-indicate')
                setIndicate(currIndex+1);
            },
            callback: function(swipe,curIdx) {
                setIndicate(curIdx+1);
            }
        });
        function setIndicate(curIdx){
            var txt=curIdx+'/'+allPages;
            indicateDom[0].innerHTML=txt;
        }
    }
    return widgetImgPreview;
})();
