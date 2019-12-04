<template>
  <div class="side-container">
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
.side-container {
  margin-right: 20px;
  width: 25%;
}

@media screen and (max-width: 920px) {
  .side-container {
    display: none;
  }
}
</style>