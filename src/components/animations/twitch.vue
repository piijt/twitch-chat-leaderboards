<template>
      <Player
        class="icon"
        name="twitch"
        path="https://assets7.lottiefiles.com/private_files/lf30_gosbaz0q.json"
      />
</template>

<script>
    import Player from "vue-lottie-player";

    export default {
        name: 'twitch',
        props: {
            loop: {
                type: Boolean,
                default: true
            }
        },
        components: {
            Player
        },
        }
</script>

<style scoped>
    .icon {
        width: 10px !important;
        height: auto !important;
        transition: transform 2s;
    }
</style>
