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
    <pagination
      class="pagination"
      :total="items.total"
      :page-size="items.pageSize"
      @currentChange="currentChange"
      :current-page="items.currentPage"
    />
  </div>
</template>

<script>
import { fetchCategories, deleteCategory } from "@/network/category";
import Pagination from "@/components/pagination/Pagination";

export default {
  name: "Category",
  created() {
    this.fetch();
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
    fetch() {
      fetchCategories(this.items.pageSize, this.items.currentPage).then(res => {
        this.items.total = res.data.total;
        this.items.categoris = res.data.items;
      });
    },
    currentChange(page) {
      this.items.currentPage = page;
      this.fetch();
    },
    edit(row) {
      this.$router.push(`/categories/edit/${row._id}`);
    },
    remove(row) {
      this.$confirm(`是否要删除 "${row.name}" 分类?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCategory(row._id).then(res => {
            this.items.currentPage = 1;
            this.fetch();
            this.$message({
              type: "success",
              message: "删除成功!",
              duration: 1000
            });
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
  },
  components: {
    Pagination
  }
};
</script>

<style scoped>
.pagination {
  position: fixed;
  bottom: 5%;
  left: 50%;
}
</style>