<template>
  <div>
    <h3>文章列表</h3>
    <el-table :data="items.articles" v-loading="loading">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="categoryId.name" label="文章分类"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="icon" label="文章封面">
        <template v-slot="scope">
          <img :src="scope.row.coverImg" style="height:5rem;width:5rem" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      <el-table-column prop="updateTime" label="上次修改时间" sortable></el-table-column>
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
  name: "Articles",
  data() {
    return {
      items: {
        articles: [],
        total: 0,
        pageSize: 4,
        currentPage: 1
      },
      loading: true
    };
  },
  created() {
    this.fetch();
    this.getList();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/articles");
      this.items.total = res.data;
      this.loading = false;
    },
    async getList() {
      const res = await this.$http.post("/articles/getList", {
        pageSize: this.items.pageSize,
        currentPage: this.items.currentPage
      });
      this.items.articles = res.data;
    },
    currentChange(page) {
      this.items.currentPage = page;
      this.getList();
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
          await this.$http.delete(`/articles/delete/${row._id}`);
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