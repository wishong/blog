<template>
  <div>
    <h3>文章列表</h3>
    <el-table :data="items.articles">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column
        prop="categoryId.name"
        label="文章分类"
        :filters="filters"
        :filter-method="filterTag"
      ></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="icon" label="文章封面">
        <template v-slot="scope">
          <el-image :src="scope.row.coverImg">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      <el-table-column prop="updateTime" label="上次修改时间" sortable></el-table-column>
      <el-table-column fixed="right" label="操作" width="260px">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary" icon="el-icon-s-comment" size="small" @click="com(scope.row)">评论</el-button>
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
import Pagination from "@/components/pagination/Pagination";
import { fetchArticles, deleteArticle } from "@/network/article";

export default {
  name: "Articles",
  created() {
    this.fetch();
  },
  data() {
    return {
      items: {
        articles: [],
        total: 0,
        pageSize: 4,
        currentPage: 1
      },
      filters: []
    };
  },
  methods: {
    fetch() {
      fetchArticles(this.items.pageSize, this.items.currentPage).then(res => {
        this.items.total = res.data.total;
        this.items.articles = res.data.items;
        res.data.items.forEach(item => {
          this.filters.push({
            text: item.categoryId.name,
            value: item.categoryId.name
          });
        });
        const temp = {};
        this.filters = this.filters.reduce((item, next) => {
          temp[next.value] ? "" : (temp[next.value] = true && item.push(next));
          return item;
        }, []);
      });
    },
    currentChange(page) {
      this.items.currentPage = page;
      this.fetch();
    },
    edit(row) {
      this.$router.push(`/articles/edit/${row._id}`);
    },
    remove(row) {
      this.$confirm(`是否要删除 "${row.title}" 文章?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteArticle(row._id).then(res => {
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
    },
    com(row) {
      this.$router.push(`/articles/comments/${row._id}`);
    },
    filterTag(value, row) {
      return row.categoryId.name === value;
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

.el-image {
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}

.image-slot {
  height: 80px;
  width: 80px;
}

.image-slot i {
  font-size: 35px;
  color: #909399;
}
</style>