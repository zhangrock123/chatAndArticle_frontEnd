<template>
    <edit-type-name :is-edit="isEdit" :id="id" :name="name"></edit-type-name>
</template>
<script>
    import editTypeName from './newArticleType.vue';
    export default {
		data() {
			return {
                isEdit: true,
                id: this.$route.query.id || null,
                name: this.$route.query.name || null
            }
        },
        components: {
            editTypeName,
        },
        computed: {
        },
        methods: {
           
        },
        events:{
            
        },
        ready(){
            // this.test();
        }
    };

</script>
