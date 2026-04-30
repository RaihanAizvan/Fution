import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SubjectDetailView from '../views/SubjectDetailView.vue'
import SubjectsView from '../views/SubjectsView.vue'
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import AdminSubjectsView from '../views/admin/AdminSubjectsView.vue'
import AdminTopicsView from '../views/admin/AdminTopicsView.vue'
import AdminTopicVersionsView from '../views/admin/AdminTopicVersionsView.vue'
import AdminBlocksView from '../views/admin/AdminBlocksView.vue'
import AdminSettingsView from '../views/admin/AdminSettingsView.vue'

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
    meta: { title: 'Admin Dashboard - Fution' }
  },
  {
    path: '/admin/subjects',
    name: 'admin-subjects',
    component: AdminSubjectsView,
    meta: { title: 'Admin Subjects - Fution' }
  },
  {
    path: '/admin/content/subjects',
    name: 'admin-content-subjects',
    component: AdminSubjectsView,
    meta: { title: 'Admin Content Subjects - Fution' }
  },
  {
    path: '/admin/subjects/:subjectId/topics',
    name: 'admin-topics',
    component: AdminTopicsView,
    meta: { title: 'Admin Topics - Fution' }
  },
  {
    path: '/admin/topics/:topicId/versions',
    name: 'admin-topic-versions',
    component: AdminTopicVersionsView,
    meta: { title: 'Admin Topic Versions - Fution' }
  },
  {
    path: '/admin/topics/:topicId/versions/:versionId',
    name: 'admin-blocks',
    component: AdminBlocksView,
    meta: { title: 'Admin Blocks - Fution' }
  },
  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: AdminSettingsView,
    meta: { title: 'Admin Settings - Fution' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title based on route meta
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router
