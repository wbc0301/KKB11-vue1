<template>
  <div>
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
// Input作用：  1：把值传给爷组件   2：让父组件校验数据
export default {
	inheritAttrs: false, //子组件没有接收的props将会作为子组件跟元素的原生HTML属性，false可以把这些属性取消掉。
	props: {
		value: {
			type: String,
			default: ""
		}
	},
	methods: {
		onInput(e) {
			this.$emit("input", e.target.value); // 赋值
			this.$parent.$emit('validate'); // 校验（让父组件做）
		}
	}
};
</script>
