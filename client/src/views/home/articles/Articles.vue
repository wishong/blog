<template>
  <div class="articles-container">
    <div class="articles-item" v-for="item in articlesList.items" :key="item._id">
      <h1 :title="item.title">{{ item.title }}</h1>
      <span class="el-icon-time">&nbsp;{{ item.createTime | createTime }}</span>
      <hr />
      <div class="cover">
        <router-link to>
          <el-image :src="item.coverImg" lazy></el-image>
        </router-link>
      </div>
      <p>{{ item.describe }}</p>
      <div class="paster">{{ item.categoryId.name }}</div>
      <div class="paster-mobile">{{ item.categoryId.name }}</div>
      <el-button round>阅读全文</el-button>
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
      }
    };
  },
  created() {
    this.fetchTotal();
    this.getList();
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
    currentChange(page) {
      this.articlesList.currentPage = page;
      this.getList();
      const clientWidth = document.documentElement.clientWidth;
      const flag = clientWidth > 910 ? 470 : 350;
      document.documentElement.scrollTop = flag;
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
  min-height: 500px;
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
  overflow: hidden;
}

.articles-item .el-image {
  width: 100%;
  max-height: 450px;
  margin-top: 15px;
}

.articles-item .el-image:hover {
  opacity: 0.8;
  transform: scale(1.05);
  transition: 0.7s all ease;
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
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
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
  left: 30%;
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
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #828282;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.el-icon-time {
  padding: 0 10px 5px 0;
  text-align: right;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  color: #9a9a9a;
}

p {
  padding: 20px 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 2; /* 控制最多显示几行 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  min-height: 45px;
  text-indent: 2rem;
  min-height: 57px;
}

h1 {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 2; /* 控制最多显示几行 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  min-height: 65px;
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

@media screen and (max-width: 920px) {
  .articles-container {
    width: 100%;
  }
  .articles-item {
    width: 45%;
  }
}

@media screen and (max-width: 700px) {
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
}
</style>