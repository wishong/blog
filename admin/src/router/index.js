import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('../views/main/Main.vue');
const Category = () => import('../views/category/Category.vue');
const CategoryEdit = () => import('../views/category/CategoryEdit.vue');
const Articles = () => import('../views/articles/Articles.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: 'categories', component: Category },
      { path: 'categories/create', component: CategoryEdit },
      { path: 'categories/edit/:id', component: CategoryEdit, props: true },
      { path: 'articles', component: Articles },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
