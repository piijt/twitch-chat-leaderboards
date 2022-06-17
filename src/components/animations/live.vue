<template>
      <transition name="slide-fade" mode="out-in"> 
          <Player
            v-show="show"
            class="slide-fade icon"
            name="live"
            loop
            path="https://assets2.lottiefiles.com/packages/lf20_tlnwbaep.json"
          />
      </transition>
</template>

<script>
    import Player from "vue-lottie-player";

    export default {
        name: 'live',
        components: {
            Player
        },
        data () {
            return {
                show: false
            }
        },
        mounted () {
            setTimeout( () => this.show = true, 100)
        }

    }
</script>

<style scoped>
    .icon {
        width: 50px !important;
        height: auto !important;
    }
</style>
