<template>
  <div>
    <h3>新建管理员</h3>
    <el-form :model="admin" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="admin.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="admin.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="admin.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postAdmins } from "../../network/admin";

export default {
  name: "AdminEdit",
  data() {
    const checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.admin.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.admin.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      admin: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,
            message: "密码至少包含数字和英文,长度6-15位"
          }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,
            message: "密码至少包含数字和英文,长度6-15位"
          }
        ],
        username: [
          { validator: checkName, trigger: "blur" },
          { pattern: /^[0-9a-zA-Z_]+$/, message: "用户名必须是英文数字组合" },
          { min: 4, message: "用户名至少4位" },
          { max: 10, message: "用户名最多10位" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postAdmins(this.admin).then(res => {
            this.$router.push("/admin");
            this.$message({
              type: "success",
              message: "创建成功",
              duration: 1000
            });
          });
        } else {
          this.$message({
            type: "error",
            message: "提交错误",
            duration: 1000
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>