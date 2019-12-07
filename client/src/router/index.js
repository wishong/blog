import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/views/home/Home.vue');
const Article = () => import('@/views/article/Article.vue');

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/article/:id', component: Article }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
