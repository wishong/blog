<template>
  <div>
    <h3>{{ title }}</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="card">
        <el-tab-pane label="文章信息">
          <el-form-item label="文章分类">
            <el-select v-model="article.categoryId">
              <el-option
                v-for="item in parentCategories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章标题">
            <el-input v-model="article.title" placeholder="请输入文章标题" maxlength="30" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="文章封面">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads/article' "
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="article.coverImg" :src="article.coverImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="文章内容">
          <mavon-editor v-model="article.content" class="editor" @imgAdd="imgAdd" ref="md" />
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ArticlesEdit",
  data() {
    return {
      article: {},
      parentCategories: [],
      loading: {}
    };
  },
  props: {
    id: {}
  },
  created() {
    this.categories();
    this.id && this.fetch();
  },
  methods: {
    async categories() {
      const res = await this.$http.get("/categories");
      this.parentCategories = res.data;
    },
    async save() {
      if (this.id) {
        await this.$http.put(`/articles/${this.id}`, this.article);
      } else {
        await this.$http.post("/articles", this.article);
      }
      this.$router.push("/articles");
      this.$message({
        type: "success",
        message: "保存成功",
        duration: 1000
      });
    },
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.article = res.data;
    },
    handleAvatarSuccess(res) {
      this.$set(this.article, "coverImg", res.url);
      console.log(res);
      
    },
    async imgAdd(pos, $file) {
      const formdata = new FormData();
      formdata.append("file", $file);
      const res = await this.$http.post("/uploads/article", formdata);
      this.$refs.md.$img2Url(pos, res.data.url);
    }
  },
  computed: {
    title() {
      return this.id ? "编辑文章" : "新建文章";
    }
  }
};
</script>

<style scoped>
.editor {
  min-height: 440px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>