import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('@/components/main/Main.vue');
const Login = () => import('@/views/login/Login.vue');
const ChangePwd = () => import('@/views/admin/ChangePwd.vue');
const Admin = () => import('@/views/admin/Admin.vue');
const AdminEdit = () => import('@/views/admin/AdminEdit.vue');
const Category = () => import('@/views/category/Category.vue');
const CategoryEdit = () => import('@/views/category/CategoryEdit.vue');
const Articles = () => import('@/views/articles/Articles.vue');
const ArticlesEdit = () => import('@/views/articles/ArticlesEdit.vue');
const CommentInfo = () => import('@/views/articles/CommentInfo.vue');

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    component: Main,
    children: [
      { path: 'admin', component: Admin },
      { path: 'admin/create', component: AdminEdit },
      { path: 'admin/changePwd/:username', component: ChangePwd },
      { path: 'categories', component: Category },
      { path: 'categories/create', component: CategoryEdit },
      { path: 'categories/edit/:id', component: CategoryEdit, props: true },
      { path: 'articles', component: Articles },
      { path: 'articles/create', component: ArticlesEdit },
      { path: 'articles/edit/:id', component: ArticlesEdit, props: true },
      { path: 'articles/comments/:id', component: CommentInfo }
    ]
  },
  { path: "*", redirect: "/admin" }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!sessionStorage.token && !to.meta.isPublic) {
    Vue.prototype.$message({
      message: '请先登录'
    })
    return next('/login');
  }
  next();
})

export default router
