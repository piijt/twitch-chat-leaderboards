<template>
    <div id="twitch-embed"></div>
</template>

<script>
  import Twitch from '../helpers/embed.twitch.tv.js'

  export default {
    name: 'twitch-player',
    props: {
        channel: String
    },
    components: {
      
    },
    mounted () {
        console.log(this.channel, 'embed')
        new Twitch.Embed("twitch-embed", {
        width: 854,
        height: 480,
        channel: this.channel,
        // Only needed if this page is going to be embedded on other websites
        parent: ["embed.example.com", "othersite.example.com"]
      });
    },  
    data() {
      return {

      };
    },
  };
</script>