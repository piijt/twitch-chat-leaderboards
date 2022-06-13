<template>
    <h2>{{channel}}</h2>
    
    <div class="kpis">
        <KPI name="Aggregate Chat Retention" value="50" unit="minutes"/>
        <KPI name="Average Chat Retention" value="50" unit="minutes"/>
        <KPI name="Messages" value="2000"/>
        <KPI name="Chat Sentiment" value="Poggers"/>
        <!-- <KPI name="Top Viewer" value="Gert" unit="minutes"/> -->
    </div>
    <h2>Viewers of {{channel}}</h2>
    <div class="container">
        <Viewers :viewers="viewers" :color="'#5468ff'"/>
    {{ StreamerChatFromSession }}
    </div>
    
</template>

<script>
import axios from 'axios';
import KPI from './kpi';
import Viewers from './viewers';

export default {
    name: 'StreamerChatAggregate',
    props: {
        channel: String
    },
    components: {
        KPI,
        Viewers
    },
    mounted() {
        this.getInfo();
    },
    data() {
        return {
            StreamerChatFromSession: null,
            viewers: null,
            aggChatRetention: null,
            avgChatRetention: null,
            totalMessages: null,
            chatSentiment: null,
            topChatter: null,
            cleanHandle: null,
        }
    },
    watch: {
        channel () {
            this.getInfo();
        }
    },  
    methods: { 
        async getInfo() {
            console.log(this.channel)
            const entry = (await axios.get('/session_sample.json')).data;
            this.StreamerChatFromSession = entry[this.channel];
            this.viewers = Object.keys(this.StreamerChatFromSession)
        },
        async getViewers() {
            return Object.keys(this.StreamerChatFromSession);
        }
    }
}
</script>

<style scoped>
    .kpis {
        display: flex;
        flex-direction: row;
    }
</style>