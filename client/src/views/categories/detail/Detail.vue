<template>
  <div>
    <detail-top>
      <span slot="title" class="title">{{ name }}</span>
    </detail-top>
    <detail-bottom>
      <span slot="title">{{ name }}ARTICLES</span>
    </detail-bottom>
  </div>
</template>

<script>
import DetailTop from "../comps/Top";
import DetailBottom from "../comps/Bottom";

export default {
  name: "Detail",
  created() {
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

/* .title::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 2px;
  background-color: #000;
} */
</style>