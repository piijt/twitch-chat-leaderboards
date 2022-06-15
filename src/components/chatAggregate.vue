<template>
    <h2>{{ channel }}</h2>

    <div class="kpis">
        <!-- <KPI name="Aggregate Retention" :value="kpis.aggChatRetention" unit="minutes"/> -->
        <KPI name="Average Retention" :value="Math.ceil(kpis.avgChatRetention)" unit="minutes" />
        <KPI name="Messages" :value="kpis.totalMessages" />
        <KPI v-if="kpis?.chatters" name="Chatters" :value="kpis.chatters" />
        <KPI name="Chat Sentiment" value="Poggers" />
        <KPI name="Tracked Duration" :value="Math.ceil(kpis.trackedDuration / 60_000)" unit="minutes" />
        <KPI name="Chat Frequency" :value="kpis.chatFrequency" :unit="`distribution (${frequencyDistributionMins})minutes`" />
    </div>
    <h2>Viewers of {{ channel }}</h2>
    <div class="container">
        <Viewers :streamer="channel" :viewers="viewers" :color="'#5468ff'" />

        <!-- <Viewer viewer="jalleo__" messagesSent="400" retention="40" />
        {{ StreamerChatFromSession }} -->
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
        Viewers,
    },
    mounted() {
        this.getInfo();
    },
    data() {
        return {
            raw: null,
            frequencyDistributionMins: 5,
            StreamerChatFromSession: null,
            viewers: null,
            topChatter: null,
            cleanHandle: null,
            activeViewer: null,
            kpis: {
                aggChatRetention: 0,
                avgChatRetention: 0,
                totalMessages: 0,
                chatSentiment: 0,
                chatters: 0,
                chatFrequency: 0,
                trackedDuration: 0
            },
            charts: {
                chatFrequency: null,
            }
        }
    },
    watch: {
        channel() {
            this.getInfo();
            this.chatFrequency();
        },
        viewers() {
            this.getViewers();
        },
    },
    methods: {
        async getInfo() {
            const entry = (await axios.get('/session_sample.json')).data;
            this.raw = entry;
            this.StreamerChatFromSession = this.raw[this.channel];
            this.viewers = Object.keys(this.StreamerChatFromSession)
            this.kpis.aggChatRetention = 0;
            this.kpis.avgChatRetention = 0;
            this.kpis.totalMessages = 0;
            this.activeViewer = this.StreamerChatFromSession[0]
            this.kpis.aggChatRetention = 0;
            for (const key of Object.keys(this.StreamerChatFromSession)) {
                const val = this.StreamerChatFromSession[key]
                this.kpis.aggChatRetention += val.retention;
                this.kpis.totalMessages += val.table.length
            }
            this.kpis.avgChatRetention = this.kpis.aggChatRetention / this.viewers.length;
        },
        async getViewers() {
            this.kpis.chatters = Object.keys(this.StreamerChatFromSession).length
        },
        async chatFrequency() {
            const group = [];
            // const bucket = [];
            for (const key of Object.keys(this.raw[this.channel])) {
                for (const entry of this.raw[this.channel][key].table) {
                    group.push(entry)
                }
            }
            const sort = group.sort((a, b) => new Date(a.time) - new Date(b.time));
            
            let bucket = [];
            let g = [];

            let gx = new Date(sort[0].time);

            gx.setSeconds(gx.getSeconds() + 5*60);

            for (let i = 0; i < sort.length; ++i) {
                if (new Date(sort[i].time).getTime() > gx.getTime()) {
                    bucket.push(g);
                    g = [];
                    gx.setSeconds(gx.getSeconds() + 5*60);
                }
                g.push(sort[i]);            
            }
            bucket.push(g)
            console.log(JSON.stringify(bucket, null,2))
            let sumFreqAvg = 0;
            let max=0
            let min = 999999;
            for(const entry of bucket) {
                console.log(entry.length / this.frequencyDistributionMins)
                console.log('length', entry.length)
                if(entry.length > max) {
                    max = entry.length
                }

                if(entry.length < min) {
                    min = entry.length
                }

                sumFreqAvg += entry.length / this.frequencyDistributionMins
            }
            console.log({sumFreqAvg, max, min, distribution: ((max-min )/ bucket.length), channel: this.channel})
            
            this.kpis.trackedDuration = new Date(sort[sort.length -1].time).getTime() - new Date(sort[0].time).getTime();
            this.charts.chatFrequency = sumFreqAvg / bucket.length;
            this.kpis.chatFrequency = bucket.length;
        },
    }
}
</script>

<style scoped>
button {
    background-color: aqua;
    color: #333
}
</style>