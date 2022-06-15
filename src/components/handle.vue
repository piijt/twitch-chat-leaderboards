<template>
  <div
    :style="{
      color: botHandles.includes(streamer_handle) ? '#ff4f4d' : gc(),
      borderColor: botHandles.includes(streamer_handle) ? '#f1f1f1' : gc(),
    }"
    class="__item"
  >
    {{ streamer_handle }}
  </div>
</template>

<script>
import generateColor from '@/helpers/generateColor';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "handle",
  props: {
    streamer_handle: String,
    type: String,
    active: Boolean,
    color: {
      default: "#bf94ff",
      type: String,
    },
  },
  data() {
    return {
      botHandles: ["nightbot", "streamelements"],
    };
  },
  methods: {
      gc () {
          return generateColor(null, 30,70,this.streamer_handle)
      }
  }
};
</script>

<style scoped>
.__item {
  border-style: solid;
  border-color: #bf94ff;
  width: auto;
  margin: 10px 10px 10px 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  color: #bf94ff;
  cursor: pointer;
  padding: 8px 8px 8px 8px;
}

.__item:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
