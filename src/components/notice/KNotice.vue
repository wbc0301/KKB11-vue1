<template>
  <div class="box" v-if="isShow">
    <h3>{{title}}</h3>
    <p class="box-content">{{message}}</p>
  </div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ""
		},
		message: {
			type: String,
			default: ""
		},
		duration: {
			type: Number,
			default: 3000
		}
	},
	data() {
		return {
			isShow: false
		};
	},
	methods: {
		show() {
			this.isShow = true;
			setTimeout(this.hide, this.duration);
		},
		hide() {
			this.isShow = false;
			this.remove();
		}
	}
};
</script>

<style scoped>
.box {
	position: fixed;
	width: 100%;
	top: 16px;
	left: 0;
	text-align: center;
	pointer-events: none;
  color:red
}
.box-content {
	width: 200px;
	margin: 10px auto;
	font-size: 14px;
	border: red 3px solid;
	padding: 8px 16px;
	background: #fff;
	border-radius: 3px;
	margin-bottom: 8px;
}
</style>