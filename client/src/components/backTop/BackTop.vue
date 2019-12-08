<template>
  <div>
    <el-backtop :visibility-height="visibility" :bottom="bottom" :right="right">
      <div class="el-icon-arrow-up"></div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  props: {
    bottom: {
      type: Number,
      default: 50
    },
    right: {
      type: Number,
      default: 20
    },
    visibility: {
      type: Number,
      default: 200
    }
  }
};
</script>

<style scoped>
.el-icon-arrow-up {
  color: #363636;
  font-size: 25px;
  font-weight: bold;
}
</style>