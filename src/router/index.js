import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'BaseLayout',
    redirect: '/home',
    component: () => import('@/layout/BaseLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/views/Detail.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
