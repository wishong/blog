<template>
  <div>
    <info-top />
    <info-bottom :articlesList="articlesList" @currentChange="currentChange" />
    <back-top />
  </div>
</template>

<script>
import { fetchArticles } from "@/network/category";
import InfoTop from "./comps/Top";
import InfoBottom from "./comps/Bottom";
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "Categories",
  created() {
    this.fetch();
  },
  data() {
    return {
      articlesList: {
        total: 0,
        pageSize: 8,
        currentPage: 1,
        items: []
      }
    };
  },
  methods: {
    fetch() {
      fetchArticles(
        this.articlesList.pageSize,
        this.articlesList.currentPage
      ).then(res => {
        this.articlesList.total = res.data.total;
        this.articlesList.items = res.data.items;
      });
    },
    currentChange(page) {
      this.articlesList.currentPage = page;
      this.fetch();
    }
  },
  components: {
    InfoTop,
    InfoBottom,
    BackTop
  }
};
</script>

<style scoped>
</style>