<template>
  <div>
    <el-backtop :visibility-height="200" :bottom="50">
      <div class="el-icon-arrow-up"></div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "BackTop"
};
</script>

<style scoped>
.el-icon-arrow-up {
  color: #363636;
  font-size: 25px;
  font-weight: bold;
}
</style>