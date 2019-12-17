<template>
  <div>
    <div v-for="(item,i) in articlesList.items" :key="item._id" class="articles-item-container">
      <hr />
      <h2 class="header">
        <router-link :to="'/article/'+item.id">{{ item.title }}</router-link>
      </h2>
      <div class="coverImg">
        <div
          :class="{back:true,isZindex:currentIndex === i}"
          @mouseenter="isHover(i)"
          @mouseleave="currentIndex = -1"
        >
          <div class="back-content">
            <h1>{{ item.title }}</h1>
            <h2>
              <router-link
                :to="'/categories/'+item.categoryId.name"
                tag="span"
              >#{{ item.categoryId.name }}</router-link>
            </h2>
            <h2>CREATE: {{ item.createTime }}</h2>
            <h2>UPDATE: {{ item.updateTime }}</h2>
          </div>
        </div>
        <div
          :class="{front:true,scale:currentIndex === i}"
          @mouseenter="isHover(i)"
          @mouseleave="currentIndex = -1"
        >
          <div class="time">{{ item.createTime | time}}</div>
          <img :src="item.coverImg" />
        </div>
      </div>
      <div class="describe" :title="item.describe">{{ item.describe }}</div>
      <button>
        <router-link :to="'/article/'+item.id" tag="p">阅读全文</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlesItem",
  data() {
    return {
      currentIndex: -1
    };
  },
  props: {
    articlesList: Object
  },
  methods: {
    isHover(i) {
      this.currentIndex = i;
    }
  },
  filters: {
    time(val) {
      const add = value => {
        return value >= 10 ? value : "0" + value;
      };
      const filter = val.split(" ")[0];
      const year = add(filter.split("-")[0].slice(2));
      const month = add(filter.split("-")[1]);
      const day = add(filter.split("-")[2]);
      return `${year}/${month}/${day}`;
    }
  }
};
</script>

<style scoped>
.articles-item-container {
  margin: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.articles-item-container .header {
  padding: 3px 20px;
  font-size: 30px;
  margin: 10px 0 20px;
}

.articles-item-container .header a {
  color: #363636;
}

.articles-item-container .header a:hover {
  color: #f16f6f;
}

.articles-item-container .coverImg {
  position: relative;
  width: 60%;
  height: 430px;
}

.articles-item-container .coverImg .back,
.front {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.articles-item-container .coverImg .front {
  transition: 0.7s all ease;
  cursor: pointer;
}

.articles-item-container .coverImg .front .time {
  position: absolute;
  width: 55px;
  height: 55px;
  color: #fff;
  font-weight: bold;
  background-color: #363636;
  text-align: center;
  line-height: 55px;
  border-radius: 50%;
  opacity: 0.8;
}

.articles-item-container .coverImg .front .time {
  top: 10px;
  right: 10px;
  font-size: 12px;
}

.articles-item-container .coverImg .scale {
  transform: scale(1.15);
  opacity: 0;
  transition: 0.7s all ease;
}

.articles-item-container .coverImg .front img {
  width: 100%;
  height: 100%;
}

.articles-item-container .coverImg .back {
  background-color: #363636;
  position: relative;
  transition: 0.7s all ease;
  opacity: 0;
}

.articles-item-container .coverImg .isZindex {
  opacity: 1;
  z-index: 2;
  transition: 0.7s all ease;
}

.articles-item-container .coverImg .back .back-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 85%;
  border: 2px solid #fff;
}

.articles-item-container .coverImg .back .back-content h1 {
  text-align: center;
  color: #fff;
  margin-top: 80px;
  margin-bottom: 65px;
  padding: 0 8px;
}

.articles-item-container .coverImg .back .back-content h2 {
  color: #fff;
  text-align: center;
  margin: 20px 0;
}

.articles-item-container .coverImg .back .back-content span {
  cursor: pointer;
  font-size: 30px;
}

.articles-item-container .coverImg .back .back-content span:hover {
  color: #f16f6f;
}

.articles-item-container .describe {
  margin: 20px 0;
  width: 60%;
  font-size: 20px;
  line-height: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

hr {
  width: 80%;
  border-top: 3px dashed #ccc;
}

button {
  cursor: pointer;
  width: 120px;
  height: 40px;
  border-radius: 50px 50px 50px 50px;
  border: 1px solid #363636;
  background-color: #fff;
  color: #363636;
  outline: none;
  font-size: 18px;
  margin-bottom: 20px;
}

button:hover {
  background-color: #363636;
  color: #fff !important;
}

@media screen and (max-width: 992px) {
  hr {
    width: 90%;
  }

  .articles-item-container .coverImg {
    width: 80%;
    height: 500px;
  }

  .articles-item-container .describe {
    width: 80%;
  }

  .articles-item-container .coverImg .back .back-content h1 {
    margin-bottom: 150px;
  }
}

@media screen and (max-width: 768px) {
  .articles-item-container {
    margin: 15px 2px;
  }

  .articles-item-container .coverImg {
    width: 100%;
    height: 230px;
  }

  .articles-item-container .describe {
    width: 100%;
    font-size: 16px;
    line-height: 25px;
    padding: 0 5px;
  }

  .articles-item-container .coverImg .back .back-content h1 {
    font-size: 20px;
    margin-bottom: 45px;
    margin-top: 20px;
  }

  .articles-item-container .coverImg .back .back-content h2 {
    font-size: 16px;
    margin: 15px 0;
  }

  .articles-item-container .coverImg .back .back-content span {
    font-size: 20px;
  }
}
</style>