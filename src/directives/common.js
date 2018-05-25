// var util = require('../libs/util.js'); 
module.exports = {

    vue: undefined,
    
    init: function(v) {
        this.vue = v;
        
        //页面高度控制
        this.vue.directive('height-ctrl', {
            update: function(o,n){
                var vm=this;
                
                this.vm.$nextTick(function(){
                     initHeight();
                })
                function initHeight(){
                    var dom_config = {
                        container: 'app-container',
                        header: 'app-header',
                        body: 'app-body',
                        footer: 'app-footer',
                        err: {
                            container: 'function initFrameScale() : app-container missed!',
                            body: 'function initFrameScale() : app-body missed!'
                        }
                    };
                    
                    var dom_container = document.getElementById(dom_config.container);
                    //容纳器不存在就报错    
                    if (!dom_container)
                        throw new Error(dom_config.err.container);
                        
                    var dom_body = document.getElementById(dom_config.body);
                    //内容器不存在就报错    
                    if (!dom_body)
                        throw new Error(dom_config.err.body);

                    var dom_header = document.getElementById(dom_config.header);
                    //头部存在就设置高度和top值
                    if (dom_header) {
                        dom_body.style.top = dom_header.style.height = dom_header.offsetHeight + 'px';
                    } else {
                        dom_body.style.top = '0';
                    }
                    
                    var dom_footer = document.getElementById(dom_config.footer);
                    //底部存在就设置高度和bottom值
                    if (dom_footer) {
                        dom_body.style.bottom = dom_footer.style.height = dom_footer.offsetHeight + 'px';
                    } else {
                        dom_body.style.bottom = '0';
                    }
                }
            }
        });
        
        this.vue.directive('textarea-ctrl', {
            update: function(o,n){
                var vm = this,
                    dom = vm.el,
                    lineHeight = 0;
                this.vm.$nextTick(function(){
                    resizeAreaHeight(dom);
                    // lineHeight = (dom.value.split('\n').length || 1) * 1.6;
                    // dom.style.height= (lineHeight > 16 ? 16 : lineHeight)+'rem';
                })
            }
        });
        this.vue.directive('scroll-bottom', {
            update: function(o,n){
                var vm = this,
                    dom = vm.el;
                dom.scrollTop=dom.scrollHeight;
                
            }
        });

        this.vue.directive('smart-scroll-bottom',{
            update: function(o,n){
                var vm = this,
                    dom = vm.el;
                var scrollTop=dom.scrollTop;
                var scrollHeight=dom.scrollHeight;
                var height=dom.offsetHeight;

                if(scrollTop > height && scrollHeight-height-scrollTop < 100){
                    dom.scrollTop=dom.scrollHeight;
                }
            }
        });

        this.vue.directive('slider-swipe',{
            update: function(o,n){
                var vm=this;
                //console.log(vm.el.lastElementChild)
                var allPages=0;
                this.vm.$nextTick(function(){
                    require(['../libs/widget-swipe.js'],function(Swipe){
                        new Swipe(vm.el, {
                            imgsReady:{0:true},
                            speed:500,
                            loop:true,
                            auto:6000,
                            onInit:function(allPage){
                                allPages = allPage;
                                setIndicate(1);
                            },
                            callback: function(swipe,curIndex) {
                                setIndicate(curIndex+1);
                            }
                            
                        })
                    });
                })
                function setIndicate(curIndex){
                    var txt=curIndex+'/'+allPages;
                    vm.el.lastElementChild.innerHTML=txt;
                }
            }
        });
        
    }

};
function resizeAreaHeight(elem){
    var scrollTop, height,
        padding = 0,
        style = elem.style;
    var minHeight=100;
    var maxHeight=600;

    if (elem._length === elem.value.length) return;
    elem._length = elem.value.length;
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    elem.style.height = minHeight + 'px';
    if (elem.scrollHeight > minHeight) {
        if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
        } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
        };
        style.height = height + 'px';
        scrollTop += parseInt(style.height) - elem.currHeight;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        elem.currHeight = parseInt(style.height);
    };
}