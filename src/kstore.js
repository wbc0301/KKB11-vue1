import Vue from "vue";
import Vuex from "./kvuex";
// import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { count: 0 },
  getters: {
    score(state) {
      return `共扔出：${state.count}`
    }
  },
  mutations: {
    increment(state, n = 1) {
      state.count += n;
    }
  },
  actions: {
    incrementAsync(contest, n) {
      setTimeout(() => {
        contest.commit("increment", n);
      }, 1000);
    }
  }
});
