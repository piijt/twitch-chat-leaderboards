<template>
      <Player
        class="icon"
        name="live"
        loop
        path="https://assets2.lottiefiles.com/packages/lf20_tlnwbaep.json"
      />
</template>

<script>
    import Player from "vue-lottie-player";

    export default {
        name: 'animation',
        props: {
            animation: String,
            loop: {
                type: Boolean,
                default: true
            }
        },
        components: {
            Player
        },
        data () {
            return {
                animations: {
                    live: "https://assets2.lottiefiles.com/packages/lf20_tlnwbaep.json",
                    twitch_black: "https://assets6.lottiefiles.com/private_files/lf30_gosbaz0q.json",
                    twitch_white: "https://assets2.lottiefiles.com/private_files/lf30_gosbaz0q.json"
                },
                activeAnimation: null,
            }
        },
        mounted () {
            this.play();
        },
        methods: {
            play () {
                this.activeAnimation = this.animations[this.animation];
                console.log(this.activeAnimation, 'active animation')
            }
        }
    }
</script>

<style scoped>
    .icon {
        width: 50px !important;
        height: auto !important;
        transition: transform 2s;
    }
</style>
