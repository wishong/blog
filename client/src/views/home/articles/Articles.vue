<template>
  <div class="articles-container">
    <div class="articles-item">
      <h3>title</h3>
      <hr />
      <div>时间 分类</div>
      <div>
        img
        <div>遮罩</div>
      </div>
      <div>内容</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  data() {
    return {
      articlesList: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.post("/articles/getList");
      console.log(res.data);
    }
  }
};
</script>

<style scoped>
.articles-container {
  box-sizing: border-box;
  margin: 0 20px;
  width: 75%;
  border: 1px solid #000;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 20px;
}

.articles-item {
  border: 1px solid red;
  height: 400px;
  margin: 20px 5px;
  width: 45%;
  padding: 10px;
}

@media screen and (max-width: 920px) {
  .articles-container {
    width: 100%;
  }
}
</style>