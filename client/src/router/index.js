import { createRouter, createWebHistory } from 'vue-router'
// import Posts from '../views/posts/index.vue'

const routes = [
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "about" */ '../views/posts/index.vue')
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/post-detail/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
