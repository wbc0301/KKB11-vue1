<template>
  <div style="font-size: 20px;">
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <span v-if="errorMessage" style="color:red;font-size: 12px;">{{errorMessage}}</span>
    <!-- {{form.rules}} -->
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ["form"], // 接收数据
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
      this.$on('validate', this.validate)
  },
  methods: {
      validate() {
          // 做校验
          const value = this.form.model[this.prop] // 获取校验值和校验规则
          const rules = this.form.rules[this.prop] // {username: [{ required: true, message: "请输入用户名" }], ...}
          // npm i async-validator -S
          const desc = {[this.prop]: rules};
          const schema = new Schema(desc);
          // return的是校验结果的Promise
          return schema.validate({[this.prop]: value}, errors => {
              if (errors) {
                  this.errorMessage = errors[0].message;
              }else {
                  this.errorMessage = ''
              }
          })
      }
  },
};
</script>

<style lang="scss" scoped>
</style>