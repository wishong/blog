<template>
  <div>
    <info-top />
    <info-bottom />
    <back-top />
  </div>
</template>

<script>
import InfoTop from "./comps/Top";
import InfoBottom from "./comps/Bottom";
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "Categories",
  components: {
    InfoTop,
    InfoBottom,
    BackTop
  }
};
</script>

<style scoped>
</style>