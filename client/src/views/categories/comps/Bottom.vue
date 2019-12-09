<template>
  <div>
    <span>
      <slot name="title">ARTICLES</slot>
    </span>
    <div class="articles"></div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      if (this.$route.params.name) {
        const res = await this.$http.get(
          `/articles/${this.$route.params.name}`
        );
        this.articles = res.data;
      } else {
        const res = await this.$http.get("/articles");
        this.articles = res.data;
      }
    }
  }
};
</script>

<style scoped>
/* span {
  position: relative;
  font-size: 30px;
  color: #666;
}

span::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 110%;
  height: 4px;
  background-color: #e9329d;
  opacity: 0.3;
} */
</style>