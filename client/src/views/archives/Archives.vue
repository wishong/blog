<template>
  <div class="archives-container">
    <div class="year">
      <span>2019</span>
      <div class="archives">
        <ul>
          <li v-for="item in archives" :key="item._id">
            <div class="archives-item">
              <div class="time" :title="item.createTime">{{ item.createTime | createTime}}</div>
              <div>
                <router-link :to="'/article/'+item._id">{{ item.title }}</router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <back-top />
  </div>
</template>

<script>
import BackTop from "../../components/backTop/BackTop";

export default {
  name: "Archives",
  created() {
    this.fetch();
  },
  data() {
    return {
      archives: {}
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/articles");
      this.archives = res.data.reverse();
    }
  },
  filters: {
    createTime(val) {
      const month = val.split(" ")[0].split("-")[1];
      const day = val.split(" ")[0].split("-")[2];
      return `${month}-${day}`;
    }
  },
  components: {
    BackTop
  }
};
</script>

<style scoped>
.archives-container {
  position: relative;
  min-height: 50vh;
  margin-bottom: 20vh;
  margin-left: 30vh;
}

.archives-container .year {
  position: relative;
}

.archives-container .year::before {
  content: "";
  position: absolute;
  border-right: 3px solid #e4e7ed;
  top: 62px;
  left: -11px;
  height: 105%;
}

.archives-container .year span {
  font-size: 35px;
  color: #666;
}

.archives-container .year span:hover {
  color: #111;
}

.archives-container .year span::before {
  content: "";
  position: absolute;
  top: 42px;
  left: -19px;
  width: 18px;
  height: 18px;
  border: 1px solid #e4e7ed;
  border-radius: 50%;
  background-color: #e4e7ed;
}

.archives-container .year .archives {
  padding-top: 20px;
  margin: 20px;
}

.archives-container .archives .archives-item {
  margin: 35px 15px;
  position: relative;
}

.archives-container .archives .archives-item::before {
  content: "";
  position: absolute;
  top: 7px;
  left: -43px;
  width: 28px;
  height: 1px;
  border: 1px solid #e4e7ed;
  background-color: #e4e7ed;
}

.archives-container .archives .archives-item::after {
  content: "";
  position: absolute;
  top: 5px;
  left: -49px;
  height: 6px;
  width: 6px;
  border: 1px solid #7461ad;
  background-color: #7461ad;
  border-radius: 50%;
}

.archives-container .archives .archives-item:hover::after {
  background-color: #fff;
  border-color: #ccc;
}

.time {
  position: absolute;
  top: -1px;
  left: -100px;
}

ul {
  list-style: none;
}

a {
  color: #363636;
}

@media screen and (max-width: 768px) {
  .archives-container {
    margin-left: 20vh;
  }
}

@media screen and (max-width: 500px) {
  .archives-container {
    margin-left: 11vh;
  }
}
</style>