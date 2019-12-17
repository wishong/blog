<template>
  <div>
    <sub-copm>
      <h2 slot="title">关于博客</h2>
      <div slot="content" class="about-blog">
        <p>于2019.11.25开始设计，原本就有想法去构思和设计个人博客，恰巧毕业设计选中了个人博客系统。由于前端满打满算学习了不到五个月，后端的node也是且学且用，还有优化和改进的空间。日益精进。</p>
        <p>每一个不曾起舞的日子,都是对生命的辜负。</p>
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