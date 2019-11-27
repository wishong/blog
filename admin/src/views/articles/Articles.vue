<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="categoryId.name" label="文章分类"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Articles",
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/articles");
      this.items = res.data;
    },
    edit(row) {
      this.$router.push(`/articles/edit/${row._id}`);
    },
    async remove(row) {
      this.$confirm(`是否要删除 "${row.title}" 文章?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          console.log(row._id);
          await this.$http.delete(`/articles/delete/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
            duration: 1000
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1000
          });
        });
    }
  }
};
</script>

<style scoped>
</style>