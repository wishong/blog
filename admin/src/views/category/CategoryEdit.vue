<template>
  <div>
    <h3>{{title}}</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="分类名称">
        <el-input v-model="category.name" placeholder="请输入新建分类名" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  data() {
    return {
      category: {}
    };
  },
  props: {
    id: {}
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.category);
        if (res.data.state === "none") {
          this.$message({
            type: "error",
            message: "请填写分类名称",
            duration: 1000
          });
        } else if (res.data.state === "error") {
          this.$message({
            type: "error",
            message: "该分类已存在,请重新命名",
            duration: 1000
          });
        } else {
          this.$message({
            type: "success",
            message: "保存成功",
            duration: 1000
          });
          this.$router.push("/categories");
        }
      } else {
        res = await this.$http.post("/categories", this.category);
        if (res.data.state === "none") {
          this.$message({
            type: "error",
            message: "请填写分类名称",
            duration: 1000
          });
        } else if (res.data.state === "error") {
          this.$message({
            type: "error",
            message: "该分类已存在,请重新命名",
            duration: 1000
          });
        } else {
          this.$message({
            type: "success",
            message: "创建成功",
            duration: 1000
          });
          this.$router.push("/categories");
        }
      }
    },
    async fetch() {
      const res = await this.$http.get(`/categories/${this.id}`);
      this.category = res.data;
    }
  },
  computed: {
    title() {
      return this.id ? "编辑分类" : "新建分类";
    }
  }
};
</script>

<style scoped>
</style>