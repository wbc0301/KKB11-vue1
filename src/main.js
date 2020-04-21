import Vue from "vue";
import App from "./App.vue";
import create from "@/utils/create"; // notice组件

import router from './router.js';
import store from './store.js';
console.log(router)
console.log(store)

// import "./plugins/element.js";

Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示。

Vue.prototype.$create = create; // 全局实例方法


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


