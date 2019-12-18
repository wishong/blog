<template>
  <!-- 侧栏 -->
  <el-container style="height: 100vh">
    <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-active="$route.path" :collapse="isCollapse" class="menu">
        <button @click="isCollapse = ! isCollapse" class="el-icon-arrow-right" v-show="isCollapse"></button>
        <button @click="isCollapse = ! isCollapse" class="el-icon-arrow-left" v-show="!isCollapse">收起</button>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">管理员</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin">管理员列表</el-menu-item>
            <el-menu-item index="/admin/create">新建管理员</el-menu-item>
            <el-menu-item :index="`/admin/changePwd/${username}`">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/categories">分类列表</el-menu-item>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-reading"></i>
            <span slot="title">文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/articles">文章列表</el-menu-item>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 顶栏 -->
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand" style="margin-right: 8px">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主要内容 -->
      <el-main class="main">
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Main",
  created() {
    this.username = JSON.parse(sessionStorage.username);
  },
  data() {
    return {
      username: "",
      isCollapse: false
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "changePwd":
          this.$router.push(`/admin/changePwd/${this.username}`);
          break;
        case "exit":
          this.$confirm("是否退出当前账号")
            .then(() => {
              this.$router.push("/login");
              sessionStorage.clear();
            })
            .catch(() => {});
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.username {
  font-size: 15px;
  line-height: 15px;
  margin-right: 10px;
}

.menu:not(.el-menu--collapse) {
  width: 200px;
}

.el-aside .el-icon-arrow-right,
.el-aside .el-icon-arrow-left {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 16px;
  color: #888;
}
</style>
