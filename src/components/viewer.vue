<template>
    <div>
        <h4>{{viewerHandle}}</h4>
        <div class="kpis">
            <KPI name="Messages Sent" :value="messagesSent"/>
            <KPI name="Retention" :value="Math.ceil(retention)" unit="minutes"/>
        </div>
        <div v-for="message of messages" v-bind:key="message">
            <Message :message="message"/>
        </div>
    </div>
</template>

<script>
    import KPI from './kpi.vue';
    import Message from './message.vue';

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'viewer',
        props: {
            viewerHandle: String,
            messages: Array,
            retention: Number,
            messagesSent: Number,
        },
        components: {
            KPI,
            Message
        },
        mounted () {},
        data () {
            return {
                
            }
        },
        watch: {
        },
        methods: {
            formatMessage (string) {
                return JSON.parse(string)
            }
        },
        computed: {}
    }
</script>

<style scoped>
</style>