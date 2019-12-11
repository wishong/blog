<template>
  <div v-if="ArticleInfo._id">
    <h1>{{ ArticleInfo.describe }}</h1>
    <div class="info">
      <div>CREATE:{{ ArticleInfo.createTime }}</div>
      <div>UPDATE:{{ ArticleInfo.updateTime }}</div>
      <div class="gategory">
        <router-link
          :to="'/categories/'+ArticleInfo.categoryId.name"
        >#{{ ArticleInfo.categoryId.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleInfo",
  computed: {
    ArticleInfo() {
      return this.$store.state.articleInfo;
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  width: 100%;
  padding: 0 3px;
}

.info {
  font-size: 30px;
  text-align: center;
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  width: 100%;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info div:first-child {
  margin-bottom: 10px;
  margin-top: 3px;
}

.info div:first-child::before {
  content: "";
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 3px;
  background-color: #fff;
}

.info div:last-child {
  margin-top: 20px;
  width: auto;
}

.info div:last-child:hover {
  transform: scale(1.5);
  transition: 1s all ease;
  text-decoration: underline;
}

a {
  color: #fff;
}

@media screen and (max-width: 992px) {
  h1 {
    font-size: 30px;
    top: 50%;
  }

  .info {
    font-size: 20px;
    top: 80%;
  }

  .info div:last-child {
    font-size: 25px;
  }

  .info div:first-child::before {
    width: 80%;
  }
}
</style>