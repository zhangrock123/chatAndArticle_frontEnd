<style>
    .load-more .loadingMore {
        padding: 0.5rem 0;
        color: #848484;
        font-size: 1.5rem;
    }
    .load-more{
        text-align: center;
    }
    .load-more .btnLoadNext{
        font-size: 1.5rem;
        color: #848484;
    }
    /*.load-more .widget-ico-loading {
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        margin: -0.4rem 0;
        background: url(../assets/images/loading.png) no-repeat center center;
        -webkit-background-size: 100%;
    }*/
    .load-more>*{
        line-height: 5rem;
    }
</style>
<template>
    <div class="load-more">
        <div v-show="isLoading" class="loadingMore" >
            加载中…
        </div>
        <div v-show="!isLoadAll && !isLoading" class="btnLoadNext">
            &nbsp;
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                timer:null,
                isLoading:false,
            };
        },
        props: {
            isLoadAll: {
                default: false
            },
            loadMoreMethod:{
                type: Function,
                required: true
            }
        },
        methods:{
            checkScroll(){
                var obj = this.$el.getBoundingClientRect();
                var lmTop = obj.top;
                var se = document.documentElement.clientHeight;
                if(!obj.height) return;
                if(lmTop < se ){
                    this.stopTimer();
                    this.triggerLoadMore();
                }
            },
            triggerLoadMore(){
                var vm = this;
                vm.isLoading = true;
                vm.loadMoreMethod()
                    .then(function(){
                        vm.isLoading = false;
                    });
                
                this.$nextTick(function(){
                    this.startTimer();
                });
            },
            startTimer(){
                var vm = this;
                var pro = new Promise(function(res,rej){});
                this.timer = setInterval(function(){
                    if(!vm.isLoading){
                        vm.checkScroll();
                    }
                },500);
            },
            stopTimer(){
                clearInterval(this.timer);
            }
        },
        ready(){
            var vm = this;
            this.startTimer();
        },
        beforeDestroy(){
            clearInterval(this.timer);
        }
	};
</script>