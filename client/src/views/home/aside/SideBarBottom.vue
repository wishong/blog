<template>
  <div>
    <el-card class="box-card">
      <span class="el-icon-collection-tag">&nbsp;分类</span>
      <div class="tagList">
        <div class="tag" v-for="item in categoriesList" :key="item">
          <router-link to>{{ item }}</router-link>
        </div>
      </div>
      <span class="el-icon-reading">&nbsp;最近文章</span>
      <ul>
        <li v-for="item in articlesList" :key="item._id" :title="item.createTime | createTime">
          <router-link :to="'/article/'+item._id">{{ item.title }}</router-link>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SideBarBottom",
  data() {
    return {
      categoriesList: [],
      articlesList: []
    };
  },
  created() {
    this.fetchCategories();
    this.fetchArticles();
  },
  methods: {
    async fetchCategories() {
      const res = await this.$http.get("/categories/home");
      this.categoriesList = res.data;
    },
    async fetchArticles() {
      const res = await this.$http.get("/articles/home");
      this.articlesList = res.data;
    }
  },
  filters: {
    createTime(val) {
      return `创建时间: ${val.split(" ")[0]}`;
    }
  }
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}

.tagList {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
}

.tagList .tag {
  margin: 5px 7px;
  padding: 8px 16px;
  border: 1px solid #666;
  border-radius: 50px/50px;
}

.tagList .tag:hover {
  transform: scale(1.1);
  transition: 0.5s all ease;
  box-shadow: 1px 1px 2px #666;
}

a {
  color: #333;
}

ul {
  list-style: none;
}

ul li {
  margin: 12px 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  background: linear-gradient(to right, #fafafa 0%, #fff 100%);
}

ul li::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: #888;
}

ul li a {
  margin-left: 12px;
}
</style>