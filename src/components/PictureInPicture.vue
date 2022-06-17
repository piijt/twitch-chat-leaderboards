<template>
    <video ref="video" controls src="/video.mp4"></video>
</template>

<script>
    export default {
        name: "picture-in-picture",
        components: {

        },
        data () {
            return {}
        },
        mounted () {
            const video = document.querySelector('video')
            video.requestPictureInPicture();
        },
        methods: {},
        watch: {},
        computed: {},
    }
</script>
<style scoped>
video {
    width: 25%;
    height: auto;
}
</style>