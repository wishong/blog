<template>
  <div class="login-container">
    <el-card header="登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post(
        "http://localhost:3000/admin/login",
        this.user
      );
      sessionStorage.setItem("token", res.data.token);
      this.$router.push("/");
      this.$message({
        type: "success",
        message: `欢迎您，${res.data.username}`
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 25rem;
  margin: 5rem auto;
}
</style>