<template>
  <div class="article-header">
    <div class="title">{{ articleInfo.title }}</div>
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
  font-size: 35px;
  letter-spacing: 2px;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 2px solid #ccc;
}

@media screen and (max-width: 768px) {
  .article-header .title {
    font-size: 20px;
  }
}
</style>