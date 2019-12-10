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
            <el-input v-model="article.title" placeholder="请输入文章标题" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="文章描述">
            <el-input v-model="article.describe" placeholder="请输入文章描述" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="文章封面">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :action="domain"
              :http-request="upqiniu"
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
      loading: {},
      domain: "https://upload-z2.qiniup.com",
      qiniuaddr: "q2aidkoon.bkt.clouddn.com",
      imageUrl: ""
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
      const res = await this.$http.get("/categories/list");
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
      this.$set(this.article, "coverImg", this.imageUrl);
    },
    async imgAdd(pos, $file) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      const timeFilter = this.$options.filters["time"];
      const keyname = timeFilter(new Date()) + "/content/" + $file.name;
      const res = await this.$http.get("/uploads");
      console.log(res.data);
      const formdata = new FormData();
      formdata.append("file", $file);
      formdata.append("token", res.data.upToken);
      formdata.append("key", keyname);
      const img = await this.$http.post(this.domain, formdata, config);
      this.imageUrl = "http://" + this.qiniuaddr + "/" + img.data.key;
      console.log(this.imageUrl);
      this.$refs.md.$img2Url(pos, this.imageUrl);
    },
    // 七牛云上传图片
    async upqiniu(req) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      const timeFilter = this.$options.filters["time"];
      const keyname = timeFilter(new Date()) + "/cover/" + req.file.name;
      const res = await this.$http.get("/uploads");
      const formdata = new FormData();
      formdata.append("file", req.file);
      formdata.append("token", res.data.upToken);
      formdata.append("key", keyname);
      const img = await this.$http.post(this.domain, formdata, config);
      this.imageUrl = "http://" + this.qiniuaddr + "/" + img.data.key;
    }
  },
  computed: {
    title() {
      return this.id ? "编辑文章" : "新建文章";
    }
  },
  filters: {
    time(value) {
      const padDate = function(value) {
        return value < 10 ? "0" + value : value;
      };
      const year = value.getFullYear();
      const month = padDate(value.getMonth() + 1);
      const day = padDate(value.getDate());
      return `${year}-${month}-${day}`;
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