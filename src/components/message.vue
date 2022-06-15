<template>
    <div class="msg-container">
        <p class="msg">{{ message.message }}</p>
        <p class="date"> {{ message.time }} </p>
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
                console.log({c: this.computedDate})
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .msg-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .msg {
        color: #f1f1f1;
    }

    .date {
        font-size: x-small;
        color: #f1f1f1;
    }

</style>