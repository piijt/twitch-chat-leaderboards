<template>
<div>
        <div class="list" v-for="viewer of viewers" v-bind:key="viewer">
        <Handle @click="getViewerInfo(viewer)" :streamer_handle="viewer" :color="color" />
    </div>
    <Viewer v-if="activeViewer" :viewer="activeViewer" :messagesSent="msgSent" :retention="viewerRetention" :messages="messages" />    
</div>

</template>

<script>

import Handle from './handle';
import Viewer from './viewer';
import axios from 'axios';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'viewers',
    props: {
        viewers: Array,
        color: String,
        streamer: String,
    },
    components: {
        Handle,
        Viewer
    },
    data() {
        return {
            streamChatters: null,
            activeViewer: null,
            msgSent: 0,
            viewerRetention: 0,
            messages: []
        }
    },
    mounted() {
       
    },
    watch: {
        viewer() {
            this.getViewerInfo();
        }
    },
    computed: {},
    methods: {
        async getViewerInfo(viewer) {
            console.log(viewer)
            this.activeViewer = viewer;
            const entry = (await axios.get('/session_sample.json')).data;
            const viewerInfo = entry[this.streamer][viewer];
            console.log(viewerInfo);
            const { retention, seen, table } = viewerInfo;
            this.msgSent = seen
            this.viewerRetention = retention,
            this.messages = table;
            console.log(JSON.stringify(
                {
                    sent: this.msgSent,
                    ret: this.viewerRetention,
                    m: this.messages
                }
            ),null,2)
        }
    }
}
</script>

<style>

.list {
    display: inline-flex
}
</style>