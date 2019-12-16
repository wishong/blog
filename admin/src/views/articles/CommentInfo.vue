<template>
  <div>
    <h3>评论列表</h3>
    <el-table :data="items.comments">
      <el-table-column prop="commenter" label="评论人"></el-table-column>
      <el-table-column prop="comment" label="内容"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="commentTime" label="评论时间" sortable></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
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
import { fetchComments, deleteComment } from "@/network/article";
import Pagination from "@/components/pagination/Pagination";

export default {
  name: "CommentInfo",
  created() {
    this.fetch();
  },
  data() {
    return {
      items: {
        comments: [],
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    };
  },
  methods: {
    fetch() {
      fetchComments(
        this.$route.params.id,
        this.items.pageSize,
        this.items.currentPage
      ).then(res => {
        this.items.comments = res.data.list;
        this.items.total = res.data.total;
      });
    },
    remove(row) {
      this.$confirm(`是否要删除 "${row.commenter}" 的评论?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteComment(row._id).then(res => {
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
    },
    currentChange(page) {
      this.items.currentPage = page;
      this.fetch();
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
  bottom: 3%;
  left: 50%;
}
</style>