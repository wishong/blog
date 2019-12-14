<template>
  <div class="article-container">
    <article-header :articleInfo="articleInfo" />
    <mavon-editor
      :value="articleInfo.content"
      :subfield="prop.subfield"
      :defaultOpen="prop.defaultOpen"
      :toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable"
      :scrollStyle="prop.scrollStyle"
      :codeStyle="prop.codeStyle"
    ></mavon-editor>
    <article-footer :prev="prev" :next="next" />
    <back-top />
    <comment :id="$route.params.id" />
  </div>
</template>

<script>
import ArticleHeader from "./comps/ArticleHeader";
import ArticleFooter from "./comps/ArticleFooter";
import BackTop from "@/components/backTop/BackTop";
import Comment from "@/components/comment/Comment";

export default {
  name: "Article",
  created() {
    this.fetch();
  },
  beforeDestroy() {
    this.$store.commit("clearArticleInfo");
  },
  data() {
    return {
      id: this.$route.params.id,
      articleInfo: {
        categoryId: { name: "" },
        createTime: "",
        updateTime: ""
      },
      prev: { title: "" },
      next: { title: "" }
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/detail/${this.id}`);
      this.articleInfo = res.data.item;
      this.prev = res.data.prev[0] || {};
      this.next = res.data.next[0] || {};
      this.$store.commit("getArticleInfo", res.data.item);
    }
  },
  computed: {
    prop() {
      const data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        codeStyle: "darcula"
      };
      return data;
    }
  },
  components: {
    ArticleHeader,
    ArticleFooter,
    BackTop,
    Comment
  }
};
</script>

<style scoped>
.article-container {
  padding: 10px;
}

.v-note-wrapper {
  position: inherit;
}
</style>