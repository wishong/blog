<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>简介</span>
      </div>
      <img src="@/assets/img/wish.jpg" />
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

.box-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>