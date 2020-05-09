<template>
  <div>
    <sub-copm>
      <h2 slot="title">关于我</h2>
      <div slot="content" class="about-me">
        <p>HUT 2020物联网工程本科毕业生。</p>
      </div>
    </sub-copm>
  </div>
</template>

<script>
import SubCopm from "./SubCopm";

export default {
  name: "AboutMe",
  components: {
    SubCopm
  }
};
</script>

<style scoped>
.about-me {
  margin: 15px 15px 0;
}
</style>