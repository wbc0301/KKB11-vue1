<template>
  <div>
    <h3>Element表单</h3><hr>
    <k-form :model="model" :rules="rules" ref="loginForm">

      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username" autocomplete="off" placeholder="输入用户名"></k-input>
      </k-form-item>

      <k-form-item label="确认密码" prop="password">
        <!-- v-model语法糖被还原后的写法  效果是一样一样的 -->
        <k-input type="password" :value="model.password" @input="value => model.password = value" autocomplete="off"></k-input>
      </k-form-item>

      <k-form-item>
        <button @click="submitForm('loginForm')">提交</button>
      </k-form-item>

      <k-form-item>
        abc
      </k-form-item>
    
    </k-form>
    <!-- {{model}} -->
  </div>
</template>

<script>
import KForm from "./Form";
import KFormItem from "./FormItem";
import KInput from "./Input";

import Notice from "@/components/notice/KNotice";

export default {
  components: {
    KForm,
    KFormItem,
    KInput
  },
  data() {
    return {
      model: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "用户名不能为空" }, {max: 6, message: '请输入少于6个字符'}],
        password: [{ required: true, message: "密码不能为空" }, {max: 3, message: '请输入少于3个字符'}]
      }
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {

        // 测试 notice组件
        const notice = this.$create(Notice, {
          title: "社会你杨哥喊你来搬砖",
          message: valid ? "请求登录!" : "校验失败!",
          duration: 3000
        });
        notice.show();

        // if(valid) {
        //   alert('登录成功');
        // }else {
        //   alert('登录失败');
        // }

      });
    }
  }
};
</script>