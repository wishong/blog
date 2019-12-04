<template>
  <div class="nav-container" ref="container">
    <nav-bar
      :class="{'hide':isHide,'nav-bar':true,'complete':isComplete}"
      @showMobileList="showMobileList"
    />
    <div :class="{mobileList:true,mobileUp:isHide}" v-show="isShow">
      <ul>
        <li v-for="item in navList" :key="item.path" @click="close()">
          <router-link
            :to="item.path"
            :class="{'mobile-actived':item.path === $route.path}"
          >{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
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
      isHide: "",
      isComplete: "",
      scrollFlag: 0,
      isShow: "",
      navList: [],
      currentIndex: 0
    };
  },
  methods: {
    watchScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let scroll = scrollTop - this.scrollFlag;
      this.scrollFlag = scrollTop;
      this.isHide = scroll > 0 ? true : false;
      const height = this.$refs.container.offsetHeight;
      this.isComplete = height - scrollTop > 0 ? false : true;
    },
    showMobileList(list) {
      this.isShow = !this.isShow;
      this.navList = list;
    },
    close() {
      this.isShow = false;
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  transition: 0.7s all ease;
  background-color: #363636;
  opacity: 0.6;
  box-shadow: 0 1px 2px #ccc;
}

.nav-container {
  width: 100%;
  height: 520px;
  background: url("../../assets/img/bg.jpg") no-repeat center fixed;
  background-size: cover;
}

.hide {
  transform: translateY(-100%);
  transition: 0.7s all ease;
  opacity: 0;
}

.complete {
  opacity: 1;
}

.mobileList {
  margin-top: 50px;
  position: fixed;
  width: 100%;
  transition: 1s all ease;
}

.mobileList ul {
  background-color: #333;
}

.mobileList li {
  text-align: center;
  font-size: 18px;
  padding: 6px 0;
  letter-spacing: 2px;
}

.mobileList a {
  text-decoration: none;
  color: #f1f1f1;
}

.mobileList .mobile-actived {
  color: #9a9a9a;
}

.mobileUp {
  transform: translateY(-50px);
  transition: 1s all ease;
}

@media screen and (max-width: 600px) {
  .nav-container {
    height: 250px;
    background-attachment: scroll;
  }
}

@media screen and (max-width: 920px) {
  .nav-container {
    height: 400px;
  }
}
</style>