
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import config from  '@/utils/config.js'
import request from '@/utils/request.js'
// import api from '@/utils/api.js'

Vue.prototype.$request = request;
Vue.prototype.$BaseUrl = config;
// Vue.prototype.$api = api;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif