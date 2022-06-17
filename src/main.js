import { createApp } from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import LoadScript from 'vue-plugin-load-script';

const app = createApp(App)
app.provide("$LoadScript", LoadScript);
app.provide("$VueMeta", VueMeta);
app.mount('#app')
