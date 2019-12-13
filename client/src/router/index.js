import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/views/home/Home.vue');
const Article = () => import('@/views/article/Article.vue');
const Categories = () => import('@/views/categories/Categories.vue');
const CategoriesDetail = () => import('../views/categories/detail/Detail.vue');
const Archives = () => import('@/views/archives/Archives.vue');
const About = () => import('@/views/about/About.vue');
const Search = () => import('@/views/search/Search.vue');

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/article/:id', component: Article },
  { path: '/categories', component: Categories },
  { path: '/categories/:name', component: CategoriesDetail },
  { path: '/archives', component: Archives },
  { path: '/search', component: Search },
  { path: '/about', component: About },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop;
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
