import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const SubjectDetailView = () => import('../views/SubjectDetailView.vue')
const SubjectsView = () => import('../views/SubjectsView.vue')
const AdminDashboardView = () => import('../views/admin/AdminDashboardView.vue')
const AdminSubjectsView = () => import('../views/admin/AdminSubjectsView.vue')
const AdminTopicsView = () => import('../views/admin/AdminTopicsView.vue')
const AdminTopicVersionsView = () => import('../views/admin/AdminTopicVersionsView.vue')
const AdminBlocksView = () => import('../views/admin/AdminBlocksView.vue')
const AdminSettingsView = () => import('../views/admin/AdminSettingsView.vue')


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Fution - Master Web Development' }
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: SubjectsView,
    meta: { title: 'Subjects - Fution' }
  },
  {
    path: '/subjects/:slug',
    name: 'subject-detail',
    component: SubjectDetailView,
    props: true,
    meta: { title: 'Subject Details - Fution' }
  },
  {
    path: '/subjects/:slug/:topicSlug',
    name: 'subject-topic',
    component: SubjectDetailView,
    props: true,
    meta: { title: 'Topic Content - Fution' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboardView,
    meta: { title: 'Admin Dashboard - Fution', requiresAuth: true }
  },
  {
    path: '/admin/subjects',
    name: 'admin-subjects',
    component: AdminSubjectsView,
    meta: { title: 'Admin Subjects - Fution', requiresAuth: true }
  },
  {
    path: '/admin/content/subjects',
    name: 'admin-content-subjects',
    component: AdminSubjectsView,
    meta: { title: 'Admin Content Subjects - Fution', requiresAuth: true }
  },
  {
    path: '/admin/topics',
    name: 'admin-topics',
    component: AdminTopicsView,
    meta: { title: 'Admin Topics - Fution', requiresAuth: true }
  },
  {
    path: '/admin/topics/:topicId/versions',
    name: 'admin-topic-versions',
    component: AdminTopicVersionsView,
    meta: { title: 'Admin Topic Versions - Fution', requiresAuth: true }
  },
  {
    path: '/admin/topics/:topicId/versions/:versionId',
    name: 'admin-blocks',
    component: AdminBlocksView,
    meta: { title: 'Admin Blocks - Fution', requiresAuth: true }
  },
  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: AdminSettingsView,
    meta: { title: 'Admin Settings - Fution', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title and handle auth
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
