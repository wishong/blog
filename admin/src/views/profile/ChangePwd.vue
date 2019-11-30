<template>
  <div>
    <h3>修改密码</h3>
    <el-form :model="admin" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="旧密码" prop="oldpwd">
        <el-input type="password" v-model.number="admin.oldpwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
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
export default {
  name: "ChangePwd",
  data() {
    const checkOld = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
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
        oldpwd: "",
        password: "",
        checkPass: ""
      },
      username: "",
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
        oldpwd: [
          { validator: checkOld, trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,
            message: "密码至少包含数字和英文,长度6-15位"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const res = this.$http
            .put(`/admins/changePwd/${this.username}`, this.admin)
            .then(res => {
              this.$message({
                type: "success",
                message: "修改成功,2秒后请重新登录",
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push("/login");
                sessionStorage.clear();
              }, 2000);
            });
        } else {
          this.$message({
            type: "error",
            message: "修改错误",
            duration: 1000
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.username = this.$route.params.username;
  }
};
</script>

<style scoped>
</style>