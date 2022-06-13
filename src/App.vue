<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <h1>Twitch Chat Leaderboards</h1>
  <Streamers/>
</template>

<script>
import Streamers from './components/streamers.vue'

export default {
  name: 'App',
  components: {
    Streamers
  }
}
</script>

<style>
* {
  background: #0e0e10;
}
body {
  margin-left: 150px;
  margin-right: 150px;
}
h1, h2, h3 {
  color: #f1f1f1;
}
.container {
   display: flex;
  flex-wrap: wrap;
}
.list {
  flex-direction:column;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
    /* --color-twitch-purple-5: #330c6e;
    --color-twitch-purple-6: #451093;
    --color-twitch-purple-7: #5c16c5;
    --color-twitch-purple-8: #772ce8;
    --color-twitch-purple-9: #9147ff;
    --color-twitch-purple-10: #a970ff;
    --color-twitch-purple-11: #bf94ff; */
</style>
