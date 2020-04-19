<template>
  <div id="app">
    <FormSample></FormSample>
    <Tree></Tree>

    <!-- router -->
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view></router-view>

    <!-- vuex -->
    <div>{{$store.state.count}}</div>
    <div>{{$store.getters.score}}</div>
    <button @click="$store.commit('increment', 3)">同步加</button><br>
    <button @click="$store.dispatch('incrementAsync', 3)">异步加</button>

  </div>
</template>

<script>
import FormSample from "./components/form";
import Tree from "./components/tree";

export default {
	name: "app",
	components: {
		FormSample,
		Tree
	}
};
</script>

<style>
#app {
	text-align: center;
}
</style>
