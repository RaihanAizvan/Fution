import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/mern/week/1'
    },
    {
      path: '/mern',
      redirect: '/mern/week/1'
    },
    {
      path: '/mern/week/:id',
      name: 'week',
      component: () => import('../views/WeekView.vue'),
      props: route => ({ id: Number(route.params.id) })
    },
    {
      path: '/mern/fution-space',
      name: 'fution-space',
      component: () => import('../views/FutionSpace.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/mern/week/1'
    }
  ]
})

// Optional: Add navigation guards for analytics or page transitions
// router.beforeEach((to, from, next) => {
//   // Could add page loader logic here
//   next()
// })

export default router
