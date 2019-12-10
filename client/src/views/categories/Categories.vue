<template>
  <div>
    <info-top />
    <info-bottom :list="list" />
    <back-top />
  </div>
</template>

<script>
import InfoTop from "./comps/Top";
import InfoBottom from "./comps/Bottom";
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "Categories",
  created() {
    this.fetch();
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/articles");
      this.list = res.data;
    }
  },
  components: {
    InfoTop,
    InfoBottom,
    BackTop
  }
};
</script>

<style scoped>
</style>