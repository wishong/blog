<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>个人中心
          </template>
          <el-menu-item-group>
            <el-menu-item index="/profile">我的</el-menu-item>
            <el-menu-item :index="`/profile/changePwd/${username}`">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>分类管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="/categories">分类列表</el-menu-item>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-reading"></i>文章管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="/articles">文章列表</el-menu-item>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>系统设置
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin">管理员列表</el-menu-item>
            <el-menu-item index="/admin/create">新建管理员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand" style="margin-right: 8px">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">我的</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Main",
  methods: {
    handleCommand(command) {
      switch (command) {
        case "profile":
          this.$router.push("/profile");
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
  },
  computed: {
    username() {
      return JSON.parse(sessionStorage.username);
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
</style>
