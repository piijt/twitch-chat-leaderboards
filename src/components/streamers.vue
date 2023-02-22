<template>
  <div v-if="activeStreamers.length" class="container">
    <div v-for="streamer in filteredList" v-bind:key="streamer">
      <Handle @click="displayChannel(streamer)" type="twitch" :streamer_handle="streamer" />
    </div>
    <div class="sidebar">
      <div class="section-header">
        <TwitchAnim class="twitch-animation" />
        <h2>Streamers</h2>
      </div>
      <input v-if="activeStreamers.length" type="text" v-model="searchQuery" placeholder="Search..." />
        <div class="streamer-list">
          <!-- <li>{{streamer.substring(1)}}</li> -->
          <ul v-for="streamer in filteredList" v-bind:key="streamer">
            <listItem @click="displayChannel(streamer)" :str="streamer" />
          </ul>
        </div>

    </div>
  </div>
  <Streamer v-if="activeHandle" :channel="activeHandle" />
</template>

<script>
import axios from "axios";
import Handle from "./handle";
import Streamer from "./streamer.vue";
import generateColor from "@/helpers/generateColor";
import TwitchAnim from "./animations/twitch.vue";
import listItem from './listItem.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "streamers",
  components: {
    Handle,
    Streamer,
    TwitchAnim,
    listItem,
  },
  data: () => {
    return {
      streamers: null,
      search: 'Search...',
      activeStreamers: [],
      searchQuery: "",
      cursor: 10,
      showAggregate: false,
      activeHandle: null,
    };
  },
  created() {}, // before mount
  mounted() {
    this.get_streamers_from_active_session(Infinity);
  },
  computed: {
    filteredList() {
      return this.activeStreamers.filter(x => {
        const handle = x.substring(1);
        return handle.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
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
      this.searchQuery = handle.substring(1)
      this.activeHandle = handle;
    },
  },
  watchers: {},
};
</script>

<style scoped>
.container {
  z-index: -1;
}
h2 {
  display: flex;
  justify-content: center;
}
.list {
  flex-direction: column;
}
.twitch-animation {
  width: 100px !important;
}

input {
  display: block;
  width: 30%;
  margin: 20px auto;
  padding: 10px 45px;
  color: #f1f1f1;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border: 1px solid #333;
}
ul {
  list-style-type: none;
}
.sidebar {
  position: absolute;
  left:0;
  top:0
}
.sidebar > li {
  list-style-type: none;
  text-decoration: none;
}
.search:focus {
  border: none;
}
.section-header {
  display: flex;
  align-items: center;
}
</style>
