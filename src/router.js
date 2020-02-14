import Vue from "vue";
// import VueRouter from "./krouter";
import VueRouter from "vue-router";

import Home from "./views/Home";
import About from "./views/About";


// 使用 router
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About }
  ]
});