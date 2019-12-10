<template>
  <div>
    <detail-top>
      <span slot="title" class="title">{{ name }}</span>
    </detail-top>
    <detail-bottom :list="list"></detail-bottom>
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
      list: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/${this.$route.params.name}`);
      this.list = res.data;
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
.title {
  position: relative;
}
</style>