import Vue from 'vue';
import Router from './krouter';
import Home from './views/Home.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
]

const router = new Router({routes});

export default router
