<template>
  <div class="nav-bar">
    <div class="left">
      <img src="@/assets/img/icon.png" />
      <p>WISH ' s Blog</p>
    </div>
    <div class="right">
      <ul>
        <li v-for="item in navList" :key="item.path">
          <div class="box">
            <div :class="{front:true,actived:item.path === $route.path}">{{ item.title }}</div>
            <router-link :to="item.path">
              <div :class="{bottom:true,actived:item.path === $route.path}">{{ item.title }}</div>
            </router-link>
          </div>
        </li>
      </ul>
      <div class="el-icon-menu" @click="show"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      navList: [
        { title: "首页", path: "/home" },
        { title: "分类", path: "/categories" },
        { title: "归档", path: "/archives" },
        { title: "关于", path: "/about" }
      ],
      isShow: ""
    };
  },
  methods: {
    show() {
      this.$emit("showMobileList", this.navList);
    }
  }
};
</script>

<style scoped >
.nav-bar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  z-index: 99;
}

.left {
  margin-left: 60px;
  display: flex;
  align-items: center;
}

.left img {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

.left img:hover {
  transform: translateX(170px) rotate(360deg);
  transition: 2s all ease;
}

.left p {
  color: #fff;
  margin-left: 10px;
  font-size: 20px;
}

.right {
  margin-right: 20px;
  position: relative;
}

.nav-bar ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-bar ul li {
  width: 40px;
  height: 35px;
  perspective: 1350px;
  float: left;
  margin: 0 15px;
  letter-spacing: 3px;
}

a {
  text-decoration: none;
  color: #fff;
}

.box {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: all 0.5s;
}

.box:hover {
  transform: rotateX(90deg);
}

.front,
.bottom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 50px;
}

.front {
  transform: translateZ(17.5px);
  cursor: pointer;
  color: #fff;
}

.actived {
  color: #9a9a9a;
}

.bottom {
  transform: translateY(17.5px) rotateX(-90deg);
}

.el-icon-menu {
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  line-height: 50px;
  right: 0;
  display: none;
  color: #fff;
}

@media screen and (max-width: 768px) {
  .nav-bar ul {
    display: none;
  }
  .el-icon-menu {
    display: block;
  }
  .left {
    margin-left: 20px;
  }
}
</style>