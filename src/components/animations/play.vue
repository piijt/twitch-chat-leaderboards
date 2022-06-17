
<template>
      <Player
        class="icon"
        name="live"
        loop
        path="https://assets2.lottiefiles.com/packages/lf20_z0b82vos.json"
      />
</template>

<script>
    import Player from "vue-lottie-player";

    export default {
        name: 'live',
        components: {
            Player
        },
    }
</script>

<style scoped>
    .icon {
        width: 50px !important;
        height: auto !important;
        transition: transform 2s;
    }
</style>
