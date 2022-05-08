import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import setupInterceptors from "./services/axios-interceptors";
import axios from "axios";
import VueFormulate from "@braid/vue-formulate";

Vue.config.productionTip = false;

Vue.use(VueFormulate);
setupInterceptors(axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
