<template>
  <div>
    <sub-copm>
      <h2 slot="title">关于我</h2>
      <div slot="content" class="about-me">
        <p>为什么选择做前端？机缘巧合，兴趣使然。</p>
        <p>目前掌握的技能为html、css、javascirpt、jqurery、vue以及小部分express和mongodb。</p>
        <p>往后会探索和学习新的技术栈和前沿技术。</p>
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