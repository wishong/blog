<template>
  <div class="articles-container">
    <articles-item :articlesList="articlesList" />
    <pagination
      class="pagination"
      :hide-on-single-page="true"
      :total="articlesList.total"
      :page-size="articlesList.pageSize"
      :current-page="articlesList.currentPage"
      @currentChange="currentChange"
    />
  </div>
</template>

<script>
import ArticlesItem from "./ArticlesItem";
import Pagination from "@/components/pagination/Pagination";

export default {
  name: "Articles",
  data() {
    return {
      articlesList: {
        total: 0,
        pageSize: 5,
        currentPage: 1,
        items: []
      },
      timer: null
    };
  },
  created() {
    this.fetch();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    async fetch() {
      const res = await this.$http.post("/articles", {
        pageSize: this.articlesList.pageSize,
        currentPage: this.articlesList.currentPage
      });
      this.articlesList.items = res.data.items;
      this.articlesList.total = res.data.total;
    },
    currentChange(page) {
      this.articlesList.currentPage = page;
      this.fetch();
      const pos = document.documentElement.clientWidth > 986 ? 470 : 350;
      this.scrollTo(document.documentElement, pos, 250);
    },
    scrollTo(element, to, duration) {
      if (duration <= 0) return;
      const diff = to - element.scrollTop;
      const perTick = (diff / duration) * 10;
      this.timer = setTimeout(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) return;
        this.scrollTo(element, to, duration - 10);
      }, 10);
    }
  },
  components: {
    ArticlesItem,
    Pagination
  }
};
</script>

<style scoped lang="scss">
.articles-container {
  width: 75%;
  padding: 10px;
  position: relative;
}

.pagination {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%) scale(1.2);
}

@media screen and (max-width: 992px) {
  .articles-container {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .articles-container {
    padding: 5px;
  }
}
</style>