<template>
  <div>
    <detail-top>
      <span slot="title" class="title">{{ name }}</span>
    </detail-top>
    <detail-bottom :articlesList="articlesList" @currentChange="currentChange" />
  </div>
</template>

<script>
import { fetchCategoryArticles } from "@/network/category";
import DetailTop from "../comps/Top";
import DetailBottom from "../comps/Bottom";

export default {
  name: "Detail",
  created () {
    this.fetch();
  },
  data () {
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
    fetch () {
      fetchCategoryArticles(
        this.$route.params.name,
        this.articlesList.pageSize,
        this.articlesList.currentPage
      ).then(res => {
        this.articlesList.total = res.data.total;
        this.articlesList.items = res.data.list;
      });
    },
    currentChange (page) {
      this.articlesList.currentPage = page;
      this.fetch();
    }
  },
  computed: {
    name () {
      return this.$route.params.name;
    }
  },
  components: {
    DetailTop,
    DetailBottom
  }
};
</script>

<style scoped>
</style>