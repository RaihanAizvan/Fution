import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/week/1'
    },
    {
      path: '/week/:id',
      name: 'week',
      component: () => import('../views/WeekView.vue'),
      props: route => ({ id: Number(route.params.id) })
    },
    {
      path: '/fution-space',
      name: 'fution-space',
      component: () => import('../views/FutionSpace.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/week/1'
    }
  ]
})

// Optional: Add navigation guards for analytics or page transitions
// router.beforeEach((to, from, next) => {
//   // Could add page loader logic here
//   next()
// })

export default router
