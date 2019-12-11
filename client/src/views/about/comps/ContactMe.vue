<template>
  <div class="contact-container">
    <sub-copm>
      <h2 slot="title">联系我</h2>
      <div slot="content" class="contact-me">
        <p>三人行必有我师。</p>
      </div>
      <div slot="icon">
        <ul>
          <li
            v-for="(item,i) in icons"
            :key="item.icon"
            :class="[item.icon,'iconfont']"
            @mouseover="isHover(i)"
            @mouseleave="currentIndex = -1"
          >
            <a v-if="item.href" :href="item.href"></a>
            <div :class="{border:true,isShow:currentIndex === i}">
              <img v-if="item.img" :src="item.img" />
              <p v-else>{{ item.des }}</p>
            </div>
          </li>
        </ul>
      </div>
    </sub-copm>
  </div>
</template>

<script>
import SubCopm from "./SubCopm";

export default {
  name: "ContactMe",
  data() {
    return {
      icons: [
        { icon: "icon-icon", img: require("@/assets/img/qq.jpg") },
        { icon: "icon-wechat", img: require("@/assets/img/wechat.jpg") },
        {
          icon: "icon-github",
          des: "github",
          href: "https://github.com/wishong"
        }
      ],
      currentIndex: -1
    };
  },
  methods: {
    isHover(i) {
      this.currentIndex = i;
    }
  },
  components: {
    SubCopm
  }
};
</script>

<style scoped>
.contact-container {
  padding-bottom: 50px;
}

.contact-me {
  margin: 15px 15px 0;
}

.iconfont {
  position: relative;
  font-size: 25px;
  margin: 10px 15px;
  color: #888;
  cursor: pointer;
}

.iconfont p {
  font-size: 18px;
  text-align: center;
  color: #fff;
}

.iconfont:hover {
  color: #363636;
}

.border {
  position: absolute;
  top: 140%;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  max-height: 80px;
  border: 3px solid #3192e2;
  background-color: #3192e2;
  border-radius: 5px;
  text-align: center;
  display: none;
}

.isShow {
  display: block;
}

.border img {
  width: 74px;
  height: 74px;
  border-radius: 5px;
}

.border::after {
  content: "";
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid;
  border-top-color: transparent;
  border-bottom-color: #3192e2;
  border-left-color: transparent;
  border-right-color: transparent;
}

ul {
  list-style: none;
  display: flex;
  margin: 0 27px;
}

a {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
}

</style>