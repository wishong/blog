<template>
  <div class="article-container">
    <div class="article-header">
      <div class="title">{{ articleInfo.title }}</div>
      <div class="other">
        <ul>
          <li class="el-icon-collection-tag">&nbsp;{{articleInfo.categoryId.name}}</li>
          <li
            class="el-icon-time"
            :title="`创建时间:${articleInfo.createTime}`"
          >&nbsp;{{articleInfo.createTime | time}}</li>
          <li
            class="el-icon-edit"
            :title="`修改时间:${articleInfo.updateTime}`"
          >&nbsp;{{articleInfo.updateTime | time}}</li>
        </ul>
      </div>
    </div>
    <mavon-editor
      :value="articleInfo.content"
      :subfield="prop.subfield"
      :defaultOpen="prop.defaultOpen"
      :toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable"
      :scrollStyle="prop.scrollStyle"
      :codeStyle="prop.codeStyle"
    ></mavon-editor>
    <div class="artcile-footer">
      <div class="prev" v-if="prev.title" title="上一篇">
        <router-link :to="'/article/'+prev._id">{{ prev.title }}</router-link>
      </div>
      <div class="next" v-if="next.title" title="下一篇">
        <router-link :to="'/article/'+next._id">{{ next.title }}</router-link>
      </div>
    </div>
    <back-top />
  </div>
</template>

<script>
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "Article",
  created() {
    this.fetch();
    window.scrollTo(0, 0);
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
      const res = await this.$http.get(`/articles/${this.id}`);
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
    BackTop
  },
  filters: {
    time(val) {
      const filter = val.split(" ")[0];
      const year = filter.split("-")[0].slice(2);
      const month = filter.split("-")[1];
      const day = filter.split("-")[2];
      return `${year}/${month}/${day}`;
    }
  }
};
</script>

<style scoped>
.article-container {
  padding: 10px;
}

.article-container .article-header {
  padding: 0px 10px;
  margin-bottom: 40px;
}

.article-container .article-header .title {
  text-align: center;
  font-size: 40px;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.article-container .article-header .other {
  border-bottom: 2px solid #9a9a9a;
  padding-bottom: 10px;
}

.article-container .article-header .other ul {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
}

.article-container .article-header .other li {
  margin: 0 15px;
  color: #888;
}

.article-container .artcile-footer {
  margin: 20px 50px 0;
  font-size: 20px;
  position: relative;
}

.article-container .artcile-footer a {
  color: #363636;
}

.article-container .artcile-footer .prev {
  position: absolute;
  top: 0;
  left: 50px;
}

.article-container .artcile-footer .next {
  position: absolute;
  top: 0;
  right: 50px;
}

.article-container .artcile-footer .prev::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 3px;
  width: 15px;
  height: 15px;
  border-top: 2px solid #363636;
  border-left: 2px solid #363636;
  transform: rotate(-45deg);
}

.article-container .artcile-footer .next::after {
  content: "";
  position: absolute;
  right: -15px;
  top: 3px;
  width: 15px;
  height: 15px;
  border-top: 2px solid #363636;
  border-right: 2px solid #363636;
  transform: rotate(45deg);
}

.v-note-wrapper {
  position: inherit;
}

@media screen and (max-width: 750px) {
  .article-container .article-header .title {
    text-align: left;
    font-size: 20px;
  }
  .article-container .article-header .other li {
    font-size: 14px;
  }
}

@media screen and (max-width: 500px) {
  .article-container .artcile-footer .prev {
    left: 15px;
  }
  .article-container .artcile-footer .next {
    right: 15px;
  }
}
</style>