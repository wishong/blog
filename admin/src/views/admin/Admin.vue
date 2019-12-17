<template>
  <div>
    <h3>管理员列表</h3>
    <el-table :data="items" ref="table">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="username" label="管理员名称"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-delete" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchAdmins, deleteAdmins } from "@/network/admin";

export default {
  name: "Admin",
  created() {
    this.fetch();
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    fetch() {
      fetchAdmins().then(res => {
        this.items = res.data;
      });
    },
    remove(row) {
      if (row.username === "admin") {
        return this.$message.error("此用户无法删除");
      }
      this.$confirm(`是否要删除 "${row.username}" 管理员?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAdmins(row._id).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!",
              duration: 1000
            });
            this.fetch();
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
</style>