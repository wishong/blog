<template>
  <div>
    <detail-top>
      <span slot="title" class="title">{{ name }}</span>
    </detail-top>
    <detail-bottom :articlesList="articlesList" @currentChange="currentChange"></detail-bottom>
  </div>
</template>

<script>
import DetailTop from "../comps/Top";
import DetailBottom from "../comps/Bottom";

export default {
  name: "Detail",
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
    async fetch() {
      const res = await this.$http.post(
        `/articles/${this.$route.params.name}`,
        {
          pageSize: this.articlesList.pageSize,
          currentPage: this.articlesList.currentPage
        }
      );
      this.articlesList.total = res.data.total;
      this.articlesList.items = res.data.list;
    },
    currentChange(page) {
      this.articlesList.currentPage = page;
      this.fetch();
    }
  },
  computed: {
    name() {
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