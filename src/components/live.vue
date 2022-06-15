<template>
      <Player
        class="icon"
        name="scooterAnim"
        loop
        path="https://assets2.lottiefiles.com/packages/lf20_tlnwbaep.json"
      />
</template>

<script>
    import Player from "vue-lottie-player";
    export default {
        name: 'live',
        components: {
            Player
        }
    }
</script>

<style scoped>
    .icon {
        width: 50px !important;
        height: auto !important;
        
        /* border-radius: 1000px;
         */
    }
</style>
