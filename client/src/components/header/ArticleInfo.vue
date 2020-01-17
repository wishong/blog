<template>
  <div>
    <div v-if="articleInfo._id">
      <div class="describe">{{ articleInfo.describe }}</div>
      <div class="info">
        <div>CREATE:{{ articleInfo.createTime }}</div>
        <div>UPDATE:{{ articleInfo.updateTime }}</div>
        <div class="gategory">
          <router-link
            :to="'/categories/'+articleInfo.categoryId.name"
          >#{{ articleInfo.categoryId.name }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ArticleInfo",
  computed: {
    ...mapState({
      articleInfo: state => state.articleInfo
    })
  }
};
</script>

<style scoped>
.describe {
  text-align: center;
  font-size: 30px;
  line-height: 40px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  width: 100%;
  padding: 0 50px;
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
  text-decoration: underline;
}

a {
  color: #fff;
}

@media screen and (max-width: 992px) {
  .describe {
    font-size: 25px;
    top: 47%;
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

@media screen and (max-width: 768px) {
  .describe {
    padding: 0 5px;
    font-size: 20px;
    line-height: 25px;
    top: 50%;
  }

  .info {
    font-size: 18px;
    top: 82%;
  }

  .info div:last-child {
    font-size: 20px;
    margin-top: 15px;
  }
}
</style>