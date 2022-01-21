// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '././components/App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Map from '././components/Map'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.component('map', Map.templete)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  data: {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    },
    responseType: 'json'
  },
  template: '<App/>'
})
