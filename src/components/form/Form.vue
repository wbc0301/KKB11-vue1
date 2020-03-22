<template>
  <div>
    <slot></slot>
  </div>
</template>

<script> 
// Form组件的作用：
// 1：给子组件传递数据
// 2：提供全局校验方法
export default {
	provide() { // 给所有的子孙组件传递数据 model rules
		return {
			form: this
		};
	},
	props: {
		model: {
			type: Object,
			required: true
		},
		rules: {
			type: Object
		}
	},
	methods: {
		validate(cb) {
			const tasks = this.$children
				.filter(item => item.prop)  // 过滤掉没有prop的子组件
				.map(item => item.validate());

			// 所有任务都通过才算校验通过
			Promise.all(tasks)
				.then(() => cb(true))
				.catch(() => cb(false));
		}
	}
};
</script>

<style lang="scss" scoped>
</style>