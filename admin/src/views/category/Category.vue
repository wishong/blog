<template>
  <div class="container">
    <h3>分类列表</h3>
    <el-table :data="items.categoris">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="items.total"
      :page-size="items.pageSize"
      @current-change="currentChange"
      :current-page="items.currentPage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Category",
  created() {
    this.fetch();
    this.getList();
  },
  data() {
    return {
      items: {
        categoris: [],
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/categories");
      this.items.total = res.data;
    },
    async getList() {
      const res = await this.$http.post("/categories/getList", {
        pageSize: this.items.pageSize,
        currentPage: this.items.currentPage
      });
      this.items.categoris = res.data;
    },
    currentChange(page) {
      this.items.currentPage = page;
      this.getList();
    },
    edit(row) {
      this.$router.push(`/categories/edit/${row._id}`);
    },
    async remove(row) {
      this.$confirm(`是否要删除 "${row.name}" 分类?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/categories/delete/${row._id}`);
          this.items.currentPage = 1;
          this.getList();
          this.fetch();
          this.$message({
            type: "success",
            message: "删除成功!",
            duration: 1000
          });
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
.el-pagination {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}
</style>