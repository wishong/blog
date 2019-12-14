<template>
  <div>
    <el-card class="box-card">
      <span class="el-icon-collection-tag">&nbsp;分类</span>
      <div class="tagList">
        <div class="tag" v-for="item in categoriesList" :key="item">
          <router-link :to="'/categories/'+item">{{ item }}</router-link>
        </div>
      </div>
      <span class="el-icon-edit">&nbsp;最近编辑</span>
      <ul>
        <li v-for="item in articlesList" :key="item._id" :title="item.updateTime">
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
      const res = await this.$http.get("/categories");
      this.categoriesList = res.data;
    },
    async fetchArticles() {
      const res = await this.$http.get("/articles/aside");
      this.articlesList = res.data;
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
  padding: 7px 10px;
  border: 1px solid #888;
  border-radius: 12px;
}

.tagList .tag:hover {
  transform: scale(1.1);
  transition: 0.3s all ease;
  box-shadow: 1px 1px 2px #888;
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
}

ul li:hover {
  background: linear-gradient(to right, #f0f0f0 0%, #fff 100%);
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