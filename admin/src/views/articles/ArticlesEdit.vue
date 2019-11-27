<template>
  <div>
    <h2>{{ title }}</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文章分类">
        <el-select v-model="article.categoryId">
          <el-option
            v-for="item in parentCategories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="article.title" placeholder="请输入文章标题" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="article.content" placeholder="请输入文章内容" type="textarea" :rows="15"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ArticlesEdit",
  data() {
    return {
      article: {},
      parentCategories: []
    };
  },
  props: {
    id: {}
  },
  created() {
    this.categories();
    this.id && this.fetch();
  },
  methods: {
    // 获取文章的分类列表
    async categories() {
      const res = await this.$http.get("/categories");
      this.parentCategories = res.data;
    },
    async save() {
      this.id
        ? await this.$http.put(`/articles/${this.id}`, this.article)
        : await this.$http.post("/articles", this.article);
      this.$router.push("/articles");
      this.$message({
        type: "success",
        message: "保存成功",
        duration: 1000
      });
    },
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.article = res.data;
    }
  },
  computed: {
    title() {
      return this.id ? "编辑文章" : "新建文章";
    }
  }
};
</script>

<style scoped>
</style>