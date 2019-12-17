<template>
  <div>
    <div class="profile-icon" @click="drawer = true">
      <span class="el-icon-user"></span>
    </div>
    <el-drawer :visible.sync="drawer" :direction="direction" size="50%" :modal="false">
      <side-bar class="profile-mobile" />
    </el-drawer>
  </div>
</template>

<script>
import SideBar from "./SideBar";

export default {
  name: "MobileAside",
  data() {
    return {
      drawer: false,
      direction: "ltr"
    };
  },
  components: {
    SideBar
  }
};
</script>

<style scoped lang="scss">
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