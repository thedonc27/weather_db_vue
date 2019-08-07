import Vue from "vue";
import App from "./App.vue";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import VueFusionCharts from "vue-fusioncharts";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.config.productionTip = false;

Charts(FusionCharts);
PowerCharts(FusionCharts);
Widgets(FusionCharts);
FusionTheme(FusionCharts);

Vue.use(VueFusionCharts, FusionCharts);
Vue.use(router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
