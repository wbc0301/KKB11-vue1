<template>
  <div style="font-size: 20px;">
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <span v-if="errorMessage" style="color:red;font-size: 12px;">{{errorMessage}}</span>
    <!-- {{form.rules}} -->
  </div>
</template>

<script>   
// FormItem组件的作用：
// 1：完成校验
// 2：错误信息的展示
import Schema from 'async-validator'
export default {
	inject: ["form"], // 接收数据  model rules
	props: {
		label: {
			type: String,
			default: ""
		},
		prop: { // 'username' | 'password'
			type: String
		}
	},
	data() {
		return {
			errorMessage: ""
		};
	},
	mounted() {
		// this.$on('validate', this.validate()); // validate返回一个promise，$on回调没有处理返回值，所以vue会警告  
		this.$on('validate', () => {
			this.validate();
		})
	},
	methods: {
		validate() { // 校验
			const value = this.form.model[this.prop] // 获取校验值和校验规则
			const rules = this.form.rules[this.prop] // {username: [{ required: true, message: "请输入用户名" }], ...}
			// npm i async-validator -S
			const desc = { [this.prop]: rules };
			const schema = new Schema(desc);
			// return的是校验结果的 Promise
			return schema.validate({ [this.prop]: value }, errors => {
				if (errors) {
					this.errorMessage = errors[0].message;
				} else {
					this.errorMessage = ''
				}
			})
		}
	},
};
</script>

<style lang="scss" scoped>
</style>