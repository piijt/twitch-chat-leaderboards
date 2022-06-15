<template>
  <div class="section-header">
    <Live v-if="liveStatus" />
    <h2>{{ channel }}</h2>
  </div>

  <div class="kpis">
    <!-- <KPI name="Aggregate Retention" :value="kpis.aggChatRetention" unit="minutes"/> -->
    <KPI name="Average Retention" :value="Math.ceil(kpis.avgChatRetention)" unit="minutes" />
    <KPI name="Messages" :value="kpis.totalMessages" />
    <KPI v-if="kpis?.chatters" name="Chatters" :value="kpis.chatters" />
    <KPI name="Chat Sentiment" value="Poggers" />
    <KPI name="Tracked Duration" :value="Math.ceil(kpis.trackedDuration / 60000)" unit="minutes" />
    <KPI
      name="Chat Frequency"
      :value="kpis.chatFrequency"
      :unit="`distributed / (${frequencyDistributionMins})minutes`"
    />
  </div>
  <div v-if="chatCommands.length">
    <h3>Commands from chat</h3>
    <div class="list" v-for="command of chatCommands" v-bind:key="command">
      <Handle :streamer_handle="command" />
    </div>
  </div>

  <h2>Viewers of {{ channel }}</h2>
  <div class="container">
    <Viewers :streamer="channel" :viewers="viewers" :color="'#5468ff'" />
  </div>
</template>

<script>
import axios from "axios";
import KPI from "./kpi";
import Viewers from "./viewers";
import Handle from "./handle";
import Live from "./live";
import liveCheck from "../helpers/liveCheck.js";

export default {
  name: "StreamerChatAggregate",
  props: {
    channel: String,
  },
  components: {
    KPI,
    Viewers,
    Handle,
    Live,
  },
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      liveStatus: false,
      raw: null,
      frequencyDistributionMins: 5,
      StreamerChatFromSession: null,
      viewers: null,
      topChatter: null,
      cleanHandle: null,
      activeViewer: null,
      chatCommands: [],
      kpis: {
        aggChatRetention: 0,
        avgChatRetention: 0,
        totalMessages: 0,
        chatSentiment: 0,
        chatters: 0,
        chatFrequency: 0,
        trackedDuration: 0,
      },
      charts: {
        chatFrequency: null,
      },
    };
  },
  watch: {
    channel() {
      this.lc();
      this.getInfo();
      this.chatFrequency();
    },
    viewers() {
      this.getViewers();
    },
  },
  methods: {
    async getInfo() {
      const entry = (await axios.get("/session_sample.json")).data;
      this.raw = entry;
      this.StreamerChatFromSession = this.raw[this.channel];
      this.viewers = Object.keys(this.StreamerChatFromSession);
      this.kpis.aggChatRetention = 0;
      this.kpis.avgChatRetention = 0;
      this.kpis.totalMessages = 0;
      this.activeViewer = this.StreamerChatFromSession[0];
      this.kpis.aggChatRetention = 0;
      this.chatCommands = [];
      for (const key of Object.keys(this.StreamerChatFromSession)) {
        const val = this.StreamerChatFromSession[key];
        this.kpis.aggChatRetention += parseInt(val.retention) ?? 0;
        this.kpis.totalMessages += val.table.length;
        val.table.filter((item) => {
          if (item?.message.length && item?.message?.charAt(0) === "!") {
            item.handle = key;
            if (this.chatCommands.indexOf(item.message) === -1) {
              this.chatCommands.push(item.message);
            }
          }
        });
      }
      this.kpis.avgChatRetention = this.kpis.aggChatRetention / this.viewers.length;
    },

    async getViewers() {
      this.kpis.chatters = Object.keys(this.StreamerChatFromSession).length;
    },
    async lc() {
      try {
        this.liveStatus = await liveCheck(this.channel);
      } catch (error) {
        console.log(error);
      }
    },
    async chatFrequency() {
      const group = [];
      // const bucket = [];
      for (const key of Object.keys(this.raw[this.channel])) {
        for (const entry of this.raw[this.channel][key].table) {
          group.push(entry);
        }
      }
      const sort = group.sort((a, b) => new Date(a.time) - new Date(b.time));

      let bucket = [];
      let g = [];

      let gx = new Date(sort[0].time);

      gx.setSeconds(gx.getSeconds() + 5 * 60);

      for (let i = 0; i < sort.length; ++i) {
        if (new Date(sort[i].time).getTime() > gx.getTime()) {
          bucket.push(g);
          g = [];
          gx.setSeconds(gx.getSeconds() + 5 * 60);
        }
        g.push(sort[i]);
      }
      bucket.push(g);
      let sumFreqAvg = 0;
      let max = 0;
      let min = 999999;
      for (const entry of bucket) {
        if (entry.length > max) {
          max = entry.length;
        }

        if (entry.length < min) {
          min = entry.length;
        }

        sumFreqAvg += entry.length / this.frequencyDistributionMins;
      }
      //   console.log({ sumFreqAvg, max, min, distribution: (max - min) / bucket.length, channel: this.channel });

      this.kpis.trackedDuration = new Date(sort[sort.length - 1].time).getTime() - new Date(sort[0].time).getTime();
      this.charts.chatFrequency = bucket;
      this.kpis.chatFrequency = Math.ceil(sumFreqAvg / bucket.length);
    },
  },
};
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
}
</style>
