<template>
  <div class="article-header">
    <div class="title">{{ articleInfo.title }}</div>
    <div class="other">
      <!-- <router-link :to="'/categories/'+articleInfo.categoryId.name">{{articleInfo.categoryId.name}}</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleHeader",
  props: {
    articleInfo: Object
  }
};
</script>

<style scoped>
.article-header {
  padding: 0px 10px;
  margin-bottom: 20px;
}

.article-header .title {
  text-align: center;
  font-size: 40px;
  letter-spacing: 2px;
  margin-bottom: 15px;
}

.article-header .other {
  border-bottom: 2px solid #888;
  padding-bottom: 5px;
  text-align: center;
  font-size: 20px;
}

a {
  color: #888;
}

a:hover {
  text-decoration: underline;
  color: #363636;
}

@media screen and (max-width: 768px) {
  .article-header .title {
    font-size: 25px;
  }
}
</style>