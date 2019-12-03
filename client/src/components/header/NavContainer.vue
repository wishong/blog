<template>
  <div class="nav-container">
    <nav-bar :class="isFixed == true ? 'fiexed' :''" class="test" />
  </div>
</template>

<script>
import NavBar from "./NavBar";

export default {
  name: "NavContainer",
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  },
  data() {
    return {
      isFixed: ""
    };
  },
  methods: {
    watchScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop >= 520 ? true : false;
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.test {
  position: fixed;
  width: 100%;
  opacity: 0.6;
  background-color: #363938;
  box-shadow: 0 1px 2px #666;
}
.nav-container {
  width: 100%;
  height: 520px;
  background-color: skyblue;
  background: url("../../assets/img/bg.jpg") no-repeat 50% fixed;
  background-size: cover;
}
.fiexed {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  opacity: 1;
}

@media screen and (max-width: 600px) {
  .nav-container {
    height: 300px;
    background-attachment: scroll;
  }
}
</style>