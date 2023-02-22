<template>
  <Streamers />
  <footer>
    <div class="some">
      <!-- <a href="#"><img src="/twitter.png" alt=""></a>
      <a href=""><img src="/github.png" alt=""></a> -->
    </div>
    Powered by MongoNetes 
    <img src="/mongonetes.png" id="logo"/>
  </footer>
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
  background:#0e0e10;
}
#logo {
  width: 3%;
  height: auto;
}
body {
  margin-left: 275px;
  margin-right: 150px;
}

h1,
h2,
h3 {
  color: #f1f1f1;
}
.some > a {
  list-style: none;
  color: rgb(164, 229, 218);
  padding-right: 10px;
}
.some > a > img {
  width: 2%;
}
.container {
  display: flex;
  flex-wrap: wrap;
}

.list {
  flex-direction: column;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 60px;
}

.kpis {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  justify-content: space-evenly;
}

footer {
    display: flex;
    bottom: 0;
    color: #f1f1f1;
    opacity: .8;
    flex-wrap: nowrap;
    align-content: space-between;
    justify-content: flex-end;
    margin-top: 50px;
}
.twitch-logo {
  width: 2%;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
/* --color-twitch-purple-5: #330c6e;
    --color-twitch-purple-6: #451093;
    --color-twitch-purple-7: #5c16c5;
    --color-twitch-purple-8: #772ce8;
    --color-twitch-purple-9: #9147ff;
    --color-twitch-purple-10: #a970ff;
    --color-twitch-purple-11: #bf94ff; */
</style>
