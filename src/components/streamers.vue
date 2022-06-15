<template>
  <h2><img class="twitch-logo" src="/twitch.png" />Streamers</h2>
  <div class="container">
    <div v-for="streamer of activeStreamers" v-bind:key="streamer">
      <Handle @click="displayChannel(streamer)" type="twitch" :streamer_handle="streamer" />
    </div>
  </div>
  <chatAggregateVue v-if="activeHandle" :channel="activeHandle" />
</template>

<script>
import axios from "axios";
import Handle from "./handle";
import chatAggregateVue from "./chatAggregate.vue";
import generateColor from "@/helpers/generateColor";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "streamers",
  components: {
    Handle,
    chatAggregateVue,
  },
  data: () => {
    return {
      streamers: null,
      activeStreamers: null,
      cursor: 10,
      showAggregate: false,
      activeHandle: null,
    };
  },
  created() {}, // before mount
  mounted() {
    this.get_streamers_from_active_session(Infinity);
  },

  methods: {
    gc(string) {
      return generateColor(string);
    },
    async get_streamers(cursor) {
      const streamers = (await axios.get("/streamers.json")).data;
      this.streamers = streamers.splice(0, cursor);
    },

    async get_streamers_from_active_session(cursor) {
      const streamers = (await axios.get("/session_sample.json")).data;
      this.activeStreamers = Object.keys(streamers).splice(0, cursor);
      this.activeHandle = this.activeStreamers[0];
    },
    displayChannel(handle) {
      this.activeHandle = handle;
    },
  },
  watchers: {},
};
</script>

<style scoped>
h2 {
  display: flex;
  justify-content: center;
}
.list {
  flex-direction: column;
}
</style>
