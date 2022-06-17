<template>
  <a :href="`https://twitch.tv/${handle}`" target="_blank"> <Play /></a>
</template>

<script>
import Play from "./animations/play.vue";
export default {
  name: "watch",
  props: {
    handle: String,
  },
  components: {
    Play,
  },
};
</script>
