<template>
  <div id="app" :key="key">
    <header>
      <nav-container />
    </header>
    <main>
      <router-view />
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
  },
  data() {
    return {
      key: 1
    };
  },
  watch: {
    $route(to, from) {
      this.key = new Date().getTime();
    }
  }
};
</script>

<style scoped>
@import url("./assets/css/base.css");
main {
  margin: 30px 0;
}
main::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>