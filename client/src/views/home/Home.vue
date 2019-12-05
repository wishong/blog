<template>
  <div class="home-container">
    <articles />
    <div :class="{ 'side-container': true , 'fixed': isFixed }" ref="side">
      <side-bar />
    </div>
    <back-top />
    <div class="profile-icon">
      <span class="el-icon-user"></span>
    </div>
  </div>
</template>

<script>
import SideBar from "./aside/SideBar";
import Articles from "./articles/Articles";
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "Home",
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
    this.height = this.$refs.side.offsetTop;
  },
  data() {
    return {
      height: 0,
      isFixed: false
    };
  },
  methods: {
    watchScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > this.height ? true : false;
    }
  },
  components: {
    SideBar,
    Articles,
    BackTop
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: space-between;
}

.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
  background-color: #fff;
  position: fixed;
  bottom: 120px;
  right: 40px;
  display: none;
}

.profile-icon .el-icon-user {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: #363636;
}

.side-container {
  padding-right: 20px;
  width: 25%;
  transition: 0.5s all ease;
}

.fixed {
  position: fixed;
  right: 0;
  top: 0;
  transform: translateY(60px);
  transition: 0.5s all ease;
}

@media screen and (max-width: 920px) {
  .profile-icon {
    display: block;
  }
  .side-container {
    display: none;
  }
}
</style>