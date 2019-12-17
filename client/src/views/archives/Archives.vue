<template>
  <div>
    <time-line />
    <back-top />
  </div>
</template>

<script>
import TimeLine from "./comps/TimeLine";
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "Archives",
  components: {
    TimeLine,
    BackTop
  }
};
</script>

<style scoped>
</style>