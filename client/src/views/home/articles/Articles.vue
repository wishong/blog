<template>
  <div class="articles-container">
    <div class="articles-item" v-for="item in articlesList.items" :key="item._id">
      <div class="title">
        <router-link :to="'/article/'+item._id">{{ item.title }}</router-link>
      </div>
      <span class="el-icon-time">&nbsp;{{ item.createTime | createTime }}</span>
      <div class="cover">
        <img :src="item.coverImg" />
      </div>
      <p>{{ item.describe }}</p>
      <div class="paster">{{ item.categoryId.name }}</div>
      <div class="paster-mobile">{{ item.categoryId.name }}</div>
      <el-button round @click="$router.push('/article/'+item._id)">阅读全文</el-button>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="articlesList.total"
      :page-size="articlesList.pageSize"
      @current-change="currentChange"
      :current-page="articlesList.currentPage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Articles",
  data() {
    return {
      articlesList: {
        total: 0,
        pageSize: 6,
        currentPage: 1,
        items: []
      },
      timer: null
    };
  },
  created() {
    this.fetchTotal();
    this.getList();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    async fetchTotal() {
      const res = await this.$http.get("/articles/getList");
      this.articlesList.total = res.data;
    },
    async getList() {
      const res = await this.$http.post("/articles/getList", {
        pageSize: this.articlesList.pageSize,
        currentPage: this.articlesList.currentPage
      });
      this.articlesList.items = res.data;
    },
    scrollTo(element, to, duration) {
      if (duration <= 0) return;
      const diff = to - element.scrollTop;
      const perTick = (diff / duration) * 10;
      this.timer = setTimeout(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) return;
        this.scrollTo(element, to, duration - 10);
      }, 10);
    },
    currentChange(page) {
      this.articlesList.currentPage = page;
      this.getList();
      const pos = document.documentElement.clientWidth > 1010 ? 470 : 350;
      this.scrollTo(document.documentElement, pos, 250);
    }
  },
  filters: {
    createTime(val) {
      return val.split(" ")[0];
    }
  }
};
</script>

<style scoped>
.articles-container {
  width: 75%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 30px;
}

.articles-item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* min-height: 500px; */
  margin: 25px 15px;
  width: 45%;
  padding: 10px;
  position: relative;
  background: -webkit-gradient(
    linear,
    100% 80%,
    50% 10%,
    from(#fff),
    to(#f1f1f1),
    color-stop(0.1, #fff)
  );
  border: 1px solid #ccc;
  -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  -webkit-border-bottom-right-radius: 60px 5px;
}

.articles-item:before {
  content: "";
  width: 98%;
  z-index: -1;
  height: 100%;
  padding: 0 0 1px 0;
  position: absolute;
  bottom: 0;
  right: 0;
  background: -webkit-gradient(
    linear,
    0% 20%,
    0% 92%,
    from(#fff),
    to(#f9f9f9),
    color-stop(0.1, #fff)
  );
  border: 1px solid #ccc;
  -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
  -webkit-border-bottom-right-radius: 60px 5px;
  -webkit-transform: skew(2deg, 2deg) translate(3px, 8px);
}

.articles-item:after {
  content: "";
  width: 98%;
  z-index: -1;
  height: 98%;
  padding: 0 0 1px 0;
  position: absolute;
  bottom: 0;
  right: 0;
  background: -webkit-gradient(
    linear,
    0% 20%,
    0% 100%,
    from(#f3f3f3),
    to(#f6f6f6),
    color-stop(0.1, #fff)
  );
  border: 1px solid #ccc;
  -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  -webkit-transform: skew(2deg, 2deg) translate(-1px, 2px);
}

.cover {
  height: 60%;
  width: 100%;
}

.cover img {
  margin-top: 10px;
  height: 100%;
  width: 100%;
}

.paster {
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  height: 40px;
  background: -webkit-gradient(
    linear,
    555% 20%,
    0% 92%,
    from(rgba(0, 0, 0, 0.1)),
    to(rgba(0, 0, 0, 0)),
    color-stop(0.1, rgba(0, 0, 0, 0.2))
  );
  border-left: 1px dashed rgba(0, 0, 0, 0.1);
  border-right: 1px dashed rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  -webkit-transform: rotate(-30deg) skew(0, 0) translate(-30px, -20px);
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #828282;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.paster-mobile {
  display: none;
  content: "";
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 130px;
  height: 40px;
  background: -webkit-gradient(
    linear,
    555% 20%,
    0% 92%,
    from(rgba(0, 0, 0, 0.1)),
    to(rgba(0, 0, 0, 0)),
    color-stop(0.1, rgba(0, 0, 0, 0.2))
  );
  border-left: 1px dashed rgba(0, 0, 0, 0.1);
  border-right: 1px dashed rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #828282;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

p {
  margin-top: 10px;
  padding: 20px 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 2; /* 控制最多显示几行 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  text-indent: 2rem;
  min-height: 57px;
}

.title {
  text-align: center;
  margin: 15px 30px 0;
  max-width: 80%;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 1; /* 控制最多显示几行 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
}

.title a {
  color: #363636;
}

.el-icon-time {
  padding: 5px 10px 5px 0;
  text-align: right;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  color: #9a9a9a;
  border-bottom: 1px solid #ccc;
}

.el-pagination {
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%) scale(1.2);
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #363636;
  color: #fff;
}

/deep/.el-pagination.is-background li:not(.disabled):hover {
  color: #9a9a9a;
}

.el-button {
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  margin-bottom: 5px;
  padding: 15px 35px;
}

.el-button:hover {
  background-color: #363636;
  color: #fff;
}

.el-button:active {
  border-color: #363636;
  color: #363636;
}

.el-button:focus {
  border-color: #363636;
  color: #363636;
  background-color: #fff;
}

@media screen and (max-width: 1020px) {
  .articles-container {
    width: 100%;
  }
  .articles-item {
    width: 45%;
  }
  .cover {
    height: 65%;
  }
}

@media screen and (max-width: 750px) {
  .articles-container {
    padding: 0;
  }
  .articles-item {
    width: 100%;
  }
  .paster {
    display: none;
  }
  .paster-mobile {
    display: block;
  }
  .cover {
    height: 420px;
  }
  .cover img {
    height: 100%;
  }
}

@media screen and (max-width: 500px) {
  .cover {
    height: 320px;
  }
}
</style>