<template>
  <div style="font-size: 20px;">
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <span v-if="errorMessage" style="color:red;font-size: 12px;">{{errorMessage}}</span>
  </div>
</template>

<script>   
// FormItem作用： 1：定义校验函数    2：错误信息的展示
import Schema from 'async-validator'
export default {
	inject: ["form"], // 注入
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
		this.$on('validate', () => {
      this.validate();
      this.$parent.$emit('validate') // 触发父组件的validate事件
		})
	},
	methods: {
		validate() { // 校验
			const value = this.form.model[this.prop] // "tom"
			const rules = this.form.rules[this.prop] // [{ required: true, message: "请输入用户名" }]
			const descriptionObj = { [this.prop]: rules }; // {username: [{ required: true, message: "请输入用户名" }]}
			const schema = new Schema(descriptionObj); // npm i async-validator -S
			// return Promise        {username: "tom"}     
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
