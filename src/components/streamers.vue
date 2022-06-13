<template>
  <h2>Streamers</h2>
  <div class="container">    
    <div class="list" v-for="streamer of activeStreamers" v-bind:key="streamer">
      <handle @click="displayChannel(streamer)" :streamer_handle="streamer" />
    </div>
  </div>
  <chatAggregateVue v-if="activeHandle" :channel="activeHandle"/>
</template>

<script>
import axios from 'axios';
import handle from './handle';
import chatAggregateVue from './chatAggregate.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'streamers',
  components: {
    handle,
    chatAggregateVue,
  },
  data: () => {
    return {
      streamers: null,
      activeStreamers: null,
      cursor: 10,
      showAggregate: false,
      activeHandle: null,
    }
  },
  created() { }, // before mount 
  mounted() {
    this.get_streamers_from_active_session(25);
  }, 

  methods: {
    async get_streamers(cursor) {
      const streamers = (await axios.get('/streamers.json')).data
      this.streamers = streamers.splice(0, cursor)
    },
    async get_streamers_from_active_session(cursor) {
      const streamers = (await axios.get('/session_sample.json')).data
      this.activeStreamers = Object.keys(streamers).splice(0,cursor);
      this.activeHandle = this.activeStreamers[0];
    },
    displayChannel(handle) {
      console.log(handle)
      this.activeHandle = handle;
    },
  },
  watchers: {},
}
</script>

<style scoped>
.container {
   display: flex;
  flex-wrap: wrap;
}
.list {
  flex-direction:column;
}
</style>
