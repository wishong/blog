<template>
  <div class="home-container">

    <!-- 文章列表 -->
    <articles />

    <!-- 大于992px 侧边导航栏 -->
    <div :class="{ 'side-container': true , 'fixed': isFixed }" ref="side">
      <side-bar />
    </div>

    <!-- 小于992px 侧边导航栏 -->
    <mobile-aside />

    <!-- 返回顶部 -->
    <back-top />
  </div>
</template>

<script>
import SideBar from "./aside/SideBar";
import MobileAside from "./aside/MobileAside";
import Articles from "./articles/Articles";
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "Home",
  mounted () {
    window.addEventListener("scroll", this.watchScroll);
  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.watchScroll);
  },
  data () {
    return {
      isFixed: false
    };
  },
  methods: {
    watchScroll () {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > this.height ? true : false;
    }
  },
  computed: {
    height () {
      return this.$refs.side.offsetTop || 550;
    }
  },
  components: {
    SideBar,
    Articles,
    BackTop,
    MobileAside
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: space-between;
}

.side-container {
  padding-right: 35px;
  width: 25%;
  transition: 1s all ease;
}

.fixed {
  position: fixed;
  right: -5px;
  top: 0;
  transform: translateY(60px);
  transition: 1s all ease;
}

@media screen and (max-width: 992px) {
  .side-container {
    display: none;
  }
}
</style>