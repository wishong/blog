<template>
  <div>
    <side-bar-top />
    <side-bar-bottom />
  </div>
</template>

<script>
import SideBarTop from "./SideBarTop";
import SideBarBottom from "./SideBarBottom";

export default {
  name: "SideBar",
  components: {
    SideBarTop,
    SideBarBottom
  }
};
</script>

<style scoped>
</style>