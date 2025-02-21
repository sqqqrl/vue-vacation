import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import AsyncComputed from "vue-async-computed";
import "./mixins";
import _ from "lodash"

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

Vue.use(AsyncComputed);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, '$_', { value: _ });

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    Chartist: Chartist
  }
}).$mount("#app");
