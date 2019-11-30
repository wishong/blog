<template>
  <div>
    <vue-particles class="bg" :particlesNumber="100"></vue-particles>
    <div class="login-container">
      <el-card header="登录" class="login-card">
        <el-form @submit.native.prevent="login">
          <el-form-item label="用户名">
            <el-input v-model="user.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="user.password"
              type="password"
              :show-password="true"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" round class="button">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
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
      sessionStorage.setItem("username", JSON.stringify(res.data.username));
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
  margin: 8rem auto;
  position: relative;
  z-index: 999;
}
.button {
  width: 100%;
  font-size: 17px;
  letter-spacing: 3px;
  text-align: center;
}
.bg {
  position: absolute;
  width: 100%;
  height: 99%;
  top: 0;
  background: linear-gradient(to bottom, #065ea1 0%, #90b1df 100%);
}
</style>