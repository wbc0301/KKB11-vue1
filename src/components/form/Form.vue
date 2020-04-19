<template>
  <div>
    <slot></slot>
  </div>
</template>

<script> 
// Form组件的作用： 1：给子组件传递数据  2：提供全局校验方法
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
			const tasks = this.$children // 过滤掉没有prop的子组件
				.filter(item => item.prop) 
				.map(item => item.validate());
		
			Promise.all(tasks)  // 所有任务都通过才算校验通过
				.then(() => cb(true))
				.catch(() => cb(false));
		}
	}
};
</script>

<style lang="scss" scoped>
</style>