import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: import('../views/ShowOrdersView.vue')
    },
    {
      path: '/new',
      component: import('../views/CreateOrderView.vue')
    }
  ],
  history: createWebHashHistory()
})

export default router
