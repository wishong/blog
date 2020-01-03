<template>
  <div>
    <sub-copm>
      <h2 slot="title">关于博客</h2>
      <div slot="content" class="about-blog">
        <p>毕业设计，独立开发，前后端分离。</p>
        <p>于2019.11.25开始设计开发，2019.12.18完成所有功能，后续会补充。由于前端满打满算学习了不到五个月，后端的node也是且学且用，还有优化和改进的空间。日益精进。</p>
      </div>
    </sub-copm>
  </div>
</template>

<script>
import SubCopm from "./SubCopm";

export default {
  name: "AboutBlog",
  components: {
    SubCopm
  }
};
</script>

<style scoped>
.about-blog {
  margin: 15px 15px 0;
}
</style>