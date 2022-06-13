<template>
    <div class="list" v-for="streamer of viewers" v-bind:key="streamer">
      <handle :streamer_handle="streamer" :color="color"/>
    </div>
</template>

<script>

    import handle from './handle';

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'viewers',
        props: {
            viewers: Array,
            color: String,
        },
        components: {
            handle
        },
        data () {
            return {
                streamChatters: null,
            }
        }
    }
</script>

<style>
.container {
   display: flex;
  flex-wrap: wrap;
}
.list {
  flex-direction:column;
}
</style>