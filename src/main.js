import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import VueFormulate from '@braid/vue-formulate'
import setupInterceptors from './services/axios-interceptors'
import axios from 'axios'

Vue.use(VueFormulate)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

setupInterceptors(axios)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
