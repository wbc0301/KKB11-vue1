<template>
  <div id="app">
    <!-- <Communicate /> --> 
    <!-- <Recursion></Recursion> -->
    <!-- <FormSample></FormSample>
    <Tree></Tree> -->

    <!-- router -->
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view></router-view>

    <!-- vuex -->
    <!-- <div>{{$store.state.count}}</div>
    <button @click="$store.commit('increment', 3)">加</button><br>
    <button @click="$store.dispatch('incrementAsync', 3)">加加</button> -->
  </div>
</template>

<script>
// import Communicate from "./components/communicate";
// import Recursion from "./components/recursion";
// import FormSample from "./components/form";
// import Tree from "./components/tree";

export default {
	name: "app",
	components: {
		// Communicate,
		// Recursion,
		// FormSample,
		// Tree
	},
	data() {
		return {
			num: 0
		}
	},
	mounted() { }
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
