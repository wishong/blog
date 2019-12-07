<template>
  <div
    class="nav-container"
    ref="container"
    :style="{backgroundImage: 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat'}"
  >
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
    <h1>{{ des }}</h1>
    <h1>{{ describe }}</h1>
  </div>
</template>

<script>
import NavBar from "./NavBar";

export default {
  name: "NavContainer",
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.watchScroll);
  },
  data() {
    return {
      baseImg: require("../../assets/img/bg.jpg"),
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
  },
  computed: {
    coverImgUrl() {
      return this.$store.state.articleInfo.coverImg;
    },
    describe() {
      return this.$store.state.articleInfo.describe;
    },
    des() {
      return this.$store.state.des;
    }
  }
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  transition: 0.7s all ease;
  background-color: #363636;
  opacity: 0.6;
  box-shadow: 0 1px 2px #666;
}

.nav-container {
  width: 100%;
  height: 520px;
  background: url("../../assets/img/bg.jpg") no-repeat center fixed;
  /* background-repeat: no-repeat; */
  /* background-size: cover; */
  background-attachment: fixed;
  background-position: center;
  position: relative;
  z-index: 999;
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
  z-index: 999;
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

h1 {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  width: 100%;
  text-align: center;
  padding: 0 30px;
}

h1:first-of-type {
  top: 40%;
  font-size: 50px;
  letter-spacing: 2px;
}

@media screen and (max-width: 750px) {
  .nav-container {
    height: 250px;
    background-attachment: scroll;
  }
  h1 {
    font-size: 18px;
    top: 70%;
  }
}

@media screen and (max-width: 1020px) {
  .nav-container {
    height: 400px;
  }
}
</style>