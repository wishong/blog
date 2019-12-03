<template>
  <div id="app">
    <nav-container />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import NavContainer from "./components/header/NavContainer";

export default {
  name: "App",
  components: {
    NavContainer
  }
};
</script>

<style scoped>
@import url("./assets/css/base.css");
</style>