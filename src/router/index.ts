import { createRouter, createWebHistory } from 'vue-router'

import SubjectDetailView from '../views/SubjectDetailView.vue'
import SubjectsView from '../views/SubjectsView.vue'
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import AdminSubjectsView from '../views/admin/AdminSubjectsView.vue'
import AdminTopicsView from '../views/admin/AdminTopicsView.vue'
import AdminTopicVersionsView from '../views/admin/AdminTopicVersionsView.vue'
import AdminBlocksView from '../views/admin/AdminBlocksView.vue'

const routes = [
  {
    path: '/subjects',
    name: 'subjects',
    component: SubjectsView
  },
  {
    path: '/subjects/:slug',
    name: 'subject-detail',
    component: SubjectDetailView,
    props: true
  },
  {
    path: '/subjects/:slug/:topicSlug',
    name: 'subject-topic',
    component: SubjectDetailView,
    props: true
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboardView
  },
  {
    path: '/admin/subjects',
    name: 'admin-subjects',
    component: AdminSubjectsView
  },
  {
    path: '/admin/subjects/:subjectId/topics',
    name: 'admin-topics',
    component: AdminTopicsView
  },
  {
    path: '/admin/topics/:topicId/versions',
    name: 'admin-topic-versions',
    component: AdminTopicVersionsView
  },
  {
    path: '/admin/topics/:topicId/versions/:versionId',
    name: 'admin-blocks',
    component: AdminBlocksView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
