<template>
  <div>
    <h1>404</h1>
    <h2>
      <span>{{ timeout }}</span>秒后回到首页,或
      <a href="/home">点击这里</a>
    </h2>
  </div>
</template>

<script>
export default {
  name: "notFound",
  created() {
    this.goHome();
  },
  data() {
    return {
      timeout: 5
    };
  },
  methods: {
    goHome() {
      setInterval(() => {
        this.timeout--;
        if (this.timeout === 0) {
          this.$router.push("/home");
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
div {
  min-height: 30vh;
  text-align: center;
}
h1 {
  margin-top: 100px;
}
span {
  color: #f33d3d;
}
a {
  margin-left: -6px;
  color: #f33d3d;
}
</style>