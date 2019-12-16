<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>导航</span>
      </div>
      <img src="@/assets/img/wish.jpg" />
      <div class="info">
        <a href="https://github.com/wishong" target="_blank">github</a>
        <span>/</span>
        <a href="mailto:hjq690264423@vip.qq.com" target="_blank">email</a>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SideBarTop"
};
</script>

<style scoped>
.box-card {
  text-align: center;
}

.box-card span {
  font-size: 18px;
}

.box-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.info {
  margin-top: 15px;
  font-size: 18px;
}

a {
  color: #363636;
  margin: 0 10px;
}

a:hover {
  text-decoration: underline;
  color: #3192e2;
}
</style>