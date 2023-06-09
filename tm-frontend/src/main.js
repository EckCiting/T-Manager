// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import vuetify from "@/plugins/Vuetify";
import axios from "axios";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
Vue.use(Vuetify);

new Vue({
  vuetify,
  store,
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
