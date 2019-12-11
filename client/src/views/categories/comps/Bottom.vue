<template>
  <div class="bottom-container">
    <span>
      <slot name="title">ARTICLES</slot>
    </span>
    <div class="info-container">
      <h2 v-if="list.length === 0">暂时没有</h2>
      <ul>
        <li v-for="(item,i) in list" :key="item._id">
          <router-link :to="'/article/'+item._id">
            <div class="container" @mouseover="isHover(i)" @mouseout="currentIndex = -1">
              <img :src="item.coverImg" />
              <div :class="{cover:currentIndex === i}">
                <h1>阅读全文</h1>
              </div>
              <div
                :class="{info:currentIndex !== i}"
                @mouseover="isHover(i)"
                @mouseout="currentIndex = -1"
              >
                <div class="info-category">{{ item.categoryId.name }}</div>
                <div class="info-title">{{ item.title }}</div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bottom",
  data() {
    return {
      currentIndex: -1
    };
  },
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    isHover(i) {
      this.currentIndex = i;
    }
  }
};
</script>

<style scoped>
.bottom-container {
  margin: 20px;
}

.info-container {
  width: 100%;
  height: 100%;
  padding-top: 20px;
}

.container {
  height: 250px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 30px;
}

.container .cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #363636;
  opacity: 0.7;
  transition: 1s all ease;
}

.container img {
  width: 100%;
  height: 100%;
}

.container .info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #363636;
  opacity: 0.7;
  text-align: center;
  transition: 1s all ease;
}

.container .info .info-category {
  position: relative;
  font-size: 20px;
  font-weight: bold;
  padding: 8px;
}

.container .info .info-category::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background-color: #ccc;
}

.container .info .info-title {
  padding: 5px 3px 8px;
  font-size: 16px;
}

span {
  position: relative;
  font-size: 30px;
  color: #666;
}

span::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 110%;
  height: 4px;
  background-color: #3d57e7;
  opacity: 0.4;
}

ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

ul li {
  font-size: 18px;
  position: relative;
  width: 25%;
  height: 100%;
}

a {
  color: #fff;
}

h1 {
  text-align: center;
  line-height: 200px;
  color: #fff;
}

h2 {
  margin: 0 10px;
}

@media screen and (max-width: 992px) {
  ul li {
    width: 50%;
  }
}

@media screen and (max-width: 768px) {
  .bottom-container {
    margin: 10px;
  }

  .container {
    margin: 8px 5px;
  }

  ul li {
    width: 100%;
  }
}
</style>