<style>
    #app-footer .footer{
        border-top: 1px solid #ddd;
        text-align: center;
        padding-top: .8rem;
        padding-bottom:.3rem; 
        color:#999;
    }
   #app-footer .footer i{
       display: block;
       font-size: 2rem;
       margin-bottom: 0.1rem;
   }
   #app-footer .footer .on{
       color: #09f;
   }
</style>
<template>
    <div class="footer app-flex font_11 bg-white">
        <div :class="{'on': activeIndex ==0}" @click="$root.queryTo('chathistory')">
            <i class="icon-bubbles2"></i>
            聊天
        </div>
        <div :class="{'on': activeIndex ==1}" @click="$root.queryTo('index')">
            <i class="icon-file-text-o"></i>
            文章
        </div>
        <div :class="{'on': activeIndex ==2}" @click="$root.queryTo('contact')">
            <i class="icon-th-list"></i>
            通讯录
        </div>
       
        <div :class="{'on': activeIndex ==3}" @click="$root.queryTo('my')">
            <i class="icon-user"></i>
            我的
        </div>
    </div> 
</template>
<script>
    export default {
        props:['activeIndex','init'],
		data() {
			return {
               
            };
		},
        methods:{
             
        },
        ready(){
            
        }
    };

</script>