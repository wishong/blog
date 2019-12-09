<template>
  <div class="home-container">
    <articles />
    <div :class="{ 'side-container': true , 'fixed': isFixed }" ref="side">
      <side-bar />
    </div>
    <back-top />
    <div class="profile-icon" @click="drawer = true">
      <span class="el-icon-user"></span>
    </div>
    <el-drawer :visible.sync="drawer" :direction="direction" size="50%" :modal="false">
      <div class="profile-mobile">
        <side-bar-top />
        <side-bar-bottom />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import SideBar from "./aside/SideBar";
import Articles from "./articles/Articles";
import BackTop from "@/components/backTop/BackTop";
import SideBarTop from "./aside/SideBarTop";
import SideBarBottom from "./aside/SideBarBottom";

export default {
  name: "Home",
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.watchScroll);
  },
  data() {
    return {
      isFixed: false,
      drawer: false,
      direction: "ltr"
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
  computed: {
    height() {
      return this.$refs.side.offsetTop || 550;
    }
  },
  components: {
    SideBar,
    Articles,
    BackTop,
    SideBarTop,
    SideBarBottom
  }
};
</script>

<style scoped lang="scss">
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
  right: 20px;
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

.profile-mobile {
  padding: 3%;
}

/deep/.el-drawer {
  box-shadow: 0 8px 10px 50vw rgba(0, 0, 0, 0.2),
    0 16px 24px 50vw rgba(0, 0, 0, 0.14), 0 6px 30px 50vw rgba(0, 0, 0, 0.12);
}

/deep/.el-drawer:focus {
  outline: none;
}

/deep/.el-drawer__close-btn:focus {
  outline: none;
}

/deep/.el-drawer__header {
  margin-bottom: 5px;
}

@media screen and (max-width: 992px) {
  .profile-icon {
    display: block;
  }
  .side-container {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  /deep/.el-drawer {
    box-shadow: 0 8px 10px 20vw rgba(0, 0, 0, 0.2),
      0 16px 24px 20vw rgba(0, 0, 0, 0.14), 0 6px 30px 20vw rgba(0, 0, 0, 0.12);
  }
  /deep/.el-drawer {
    width: 80% !important;
  }
}
</style>