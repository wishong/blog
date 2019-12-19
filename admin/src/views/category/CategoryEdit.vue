<template>
  <div>
    <pageHeader v-if="this.id" />
    <h3>{{title}}</h3>
    <el-form label-width="120px" @submit.native.prevent="save" :model="category">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="category.name" placeholder="请输入新建分类名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  fetchCategory,
  postCategory,
  editCategory
} from "../../network/category";
import pageHeader from "@/components/pageHeader/PageHeader";

export default {
  name: "CategoryEdit",
  created() {
    this.id && this.fetch();
  },
  data() {
    return {
      category: {
        name: ""
      }
    };
  },
  props: {
    id: {}
  },
  methods: {
    save() {
      let res;
      if (this.id) {
        editCategory(this.id, this.category).then(res => {
          this.$router.push("/categories");
          this.$message({
            type: "success",
            message: "保存成功",
            duration: 1000
          });
        });
      } else {
        postCategory(this.category).then(res => {
          this.$router.push("/categories");
          this.$message({
            type: "success",
            message: "创建成功",
            duration: 1000
          });
        });
      }
    },
    fetch() {
      fetchCategory(this.id).then(res => {
        this.category = res.data;
      });
    }
  },
  computed: {
    title() {
      return this.id ? "编辑分类" : "新建分类";
    }
  },
  components: {
    pageHeader
  }
};
</script>

<style scoped>
</style>