<template>
  <div class="el-icon-back">
    <span @click="back">返回</span>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    url: { type: String }
  },
  methods: {
    back() {
      this.$router.push(this.url);
    }
  }
};
</script>

<style scoped>
.el-icon-back {
  font-size: 16px;
  color: #666;
}
span {
  font-size: 14px;
  font-weight: 500;
  margin-left: 6px;
  cursor: pointer;
}
</style>