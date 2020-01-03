<template>
  <div class="archives-container">
    <div class="year" v-if="articles_20.length">
      <span>2020</span>
      <archives-item :archives="articles_20" />
    </div>
    <div class="year" v-if="articles_19.length">
      <span>2019</span>
      <archives-item :archives="articles_19" />
    </div>
  </div>
</template>

<script>
import { fetchArchives } from "@/network/archive";
import ArchivesItem from "./ArchivesItem";

export default {
  name: "TimeLine",
  created() {
    this.fetch();
  },
  data() {
    return {
      articles_19: [],
      articles_20: []
    };
  },
  methods: {
    fetch() {
      fetchArchives().then(res => {
        this.articles_19 = res.data.filter(
          item => item.createTime.split("-")[0] === "2019"
        );
        this.articles_20 = res.data.filter(
          item => item.createTime.split("-")[0] === "2020"
        );
        this.archives = res.data;
      });
    }
  },
  components: {
    ArchivesItem
  }
};
</script>

<style scoped>
.archives-container {
  position: relative;
  min-height: 40vh;
  margin-bottom: 20vh;
  margin-left: 30vh;
  width: 100%;
}

.archives-container .year {
  position: relative;
}

.archives-container .year::before {
  content: "";
  position: absolute;
  border-right: 3px solid #e4e7ed;
  top: 30px;
  left: -11px;
  height: 112%;
}

.archives-container .year span {
  font-size: 35px;
  color: #888;
  padding-left: 15px;
}

.archives-container .year span:hover {
  color: #363636;
}

.archives-container .year span::before {
  content: "";
  position: absolute;
  top: 12px;
  left: -20px;
  width: 18px;
  height: 18px;
  border: 1px solid #e4e7ed;
  border-radius: 50%;
  background-color: #e4e7ed;
}

@media screen and (max-width: 768px) {
  .archives-container {
    margin-left: 15vh;
    min-height: 25vh;
  }
}
</style>