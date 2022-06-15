<template>
    <div class="msg-container">
        <p class="msg">{{ message.message }}</p>
        <p class="handle" v-if="message.handle"> {{message.handle}} </p>
        <p>{{ new Date(message.time).getHours() }}:{{ new Date(message.time).getMinutes() }}:{{ new Date(message.time).getSeconds() }}</p>
    </div>  
</template>

<script>
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'message',
        props: {
            message: Object
        },
        components: {},
        data () {
            return {
                computedDate: null,
            }
        },
        mounted () {},
        watch: {
            message () {
                this.formatDate(this.message.time)
            }
        },
        methods: {
            formatDate (string) {
                const d = new Date(string);
                this.computedDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .msg-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    .msg, .handle {
        color: #f1f1f1;
    }

    .date {
        color: #f1f1f1;
    }

</style>