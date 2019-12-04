<template>
  <div id="app">
    <header>
      <nav-container />
    </header>
    <main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
    <footer>
      <footer-container />
    </footer>
  </div>
</template>

<script>
import NavContainer from "./components/header/NavContainer";
import FooterContainer from "./components/footer/FooterContainer";

export default {
  name: "App",
  components: {
    NavContainer,
    FooterContainer
  }
};
</script>

<style scoped>
@import url("./assets/css/base.css");
main {
  overflow: hidden;
  margin: 30px 0;
}
</style>