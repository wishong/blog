<template>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page="hideOnSinglePage"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: Number,
    pageSize: Number,
    currentPage: Number,
    hideOnSinglePage: { type: Boolean, default: false }
  },
  methods: {
    currentChange(page) {
      this.$emit("currentChange", page);
    }
  }
};
</script>

<style scoped lang="scss">
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #363636;
  color: #fff;
}

/deep/.el-pagination.is-background li:not(.disabled):hover {
  color: #9a9a9a;
}
</style>