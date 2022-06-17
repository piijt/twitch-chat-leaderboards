<template>
<div>
  <li :style="{
      color:gc(),
    }">{{ str }}</li>
</div>
</template>

<script>
import generateColor from "../helpers/generateColor.js";

export default {
  name: "list-item",
  props: {
    str: String,
    randomColor: Boolean,
  },
  components: {

  },
  data() {
    return { };
  },
  mounted () {},
  methods: {
    gc() {
      return generateColor(null, 90, 80, this.str);
    },
  },
};
</script>
<style scoped>
  div {
    display:inline-flex;
    align-items: center;
  }
  li:hover {
    opacity: .8;
    cursor: pointer;
  }
  .last-item {
    width: 25px !important;
  }
</style>

