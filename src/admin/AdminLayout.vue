<template>
  <div class="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
    <aside
      class="fixed left-0 top-0 hidden h-screen border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] transition-all duration-300 lg:block"
      :class="isCollapsed ? 'w-20' : 'w-72'"
    >
      <div class="flex h-full flex-col px-4 py-8 overflow-hidden">
        <div :class="{ 'flex flex-col items-center': isCollapsed }">
          <p class="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--app-muted)]" :class="{ 'hidden': isCollapsed }">Admin</p>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-lg">
              F
            </div>
            <div v-if="!isCollapsed" class="min-w-0">
              <h1 class="text-lg font-semibold truncate">Content Studio</h1>
              <p class="text-[0.65rem] text-[var(--app-muted)] truncate">Premium CMS Workspace</p>
            </div>
          </div>
        </div>

        <div class="mt-10">
          <p v-if="!isCollapsed" class="px-2 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--app-muted)]">Workspace</p>
          <nav class="mt-4 grid gap-1 text-sm">
            <RouterLink
              to="/admin"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
              active-class="bg-[var(--sidebar-active)] text-[var(--app-text)]"
              :title="isCollapsed ? 'Dashboard' : ''"
            >
              <LayoutDashboardIcon class="h-5 w-5 shrink-0" />
              <span v-if="!isCollapsed">Dashboard</span>
            </RouterLink>

            <RouterLink
              to="/admin/subjects"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
              active-class="bg-[var(--sidebar-active)] text-[var(--app-text)]"
              :title="isCollapsed ? 'Subject Library' : ''"
            >
              <LayersIcon class="h-5 w-5 shrink-0" />
              <span v-if="!isCollapsed">Subject Library</span>
            </RouterLink>

            <div class="mt-4">
              <div v-if="!isCollapsed" class="flex items-center justify-between px-3 py-2 text-[0.65rem] uppercase tracking-wider text-[var(--app-muted)]">
                Recent Subjects
                <button
                  type="button"
                  class="transition-transform"
                  :class="{ 'rotate-180': isSubjectsOpen }"
                  @click="toggleSubjects"
                >
                  <svg viewBox="0 0 20 20" fill="none" class="h-3 w-3" stroke="currentColor" stroke-width="2">
                    <path d="M5 7.5l5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
              <div v-if="isSubjectsOpen && !isCollapsed" class="mt-1 max-h-52 overflow-y-auto pl-2 space-y-1">
                <RouterLink
                  v-for="subject in sidebarSubjects"
                  :key="subject.id"
                  :to="`/admin/topics?subjectId=${subject.id}`"
                  class="block rounded-md px-3 py-1.5 text-xs text-[var(--app-text)]/60 hover:bg-[var(--sidebar-active)]"
                  :class="{
                    'bg-[var(--sidebar-active)] text-[var(--app-text)]':
                      subject.id === activeSubjectId
                  }"
                >
                  {{ subject.title }}
                </RouterLink>
              </div>
            </div>
          </nav>
        </div>

        <div class="mt-10">
          <p v-if="!isCollapsed" class="px-2 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--app-muted)]">System</p>
          <nav class="mt-4 grid gap-1 text-sm">
            <button class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition text-left text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]" :title="isCollapsed ? 'Media' : ''">
              <ImageIcon class="h-5 w-5 shrink-0" />
              <span v-if="!isCollapsed">Media</span>
            </button>
            <button class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition text-left text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]" :title="isCollapsed ? 'Users' : ''">
              <UsersIcon class="h-5 w-5 shrink-0" />
              <span v-if="!isCollapsed">Users</span>
            </button>
            <RouterLink
              to="/admin/settings"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition text-left text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
              active-class="bg-[var(--sidebar-active)] text-[var(--app-text)]"
              :title="isCollapsed ? 'Settings' : ''"
            >
              <SettingsIcon class="h-5 w-5 shrink-0" />
              <span v-if="!isCollapsed">Settings</span>
            </RouterLink>
            <button class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition text-left text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]" :title="isCollapsed ? 'Logs' : ''">
              <ClipboardListIcon class="h-5 w-5 shrink-0" />
              <span v-if="!isCollapsed">Logs</span>
            </button>
          </nav>
        </div>

        <div v-if="!isCollapsed" class="mt-auto rounded-2xl bg-[var(--app-bg)]/40 p-4 text-[0.65rem] text-[var(--app-muted)]">
          Live environment • Synced with production APIs
        </div>
      </div>
    </aside>

    <div
      class="fixed inset-0 z-40 bg-black/70 lg:hidden"
      :class="isSidebarOpen ? 'block' : 'hidden'"
      @click="isSidebarOpen = false"
    />
    <aside
      class="fixed left-0 top-0 z-50 h-screen w-72 bg-[var(--sidebar-bg)] px-6 py-8 transition-transform lg:hidden"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">Admin</p>
            <h1 class="mt-2 text-xl font-semibold">Content Studio</h1>
          </div>
          <button class="text-[var(--app-muted)]" @click="isSidebarOpen = false">✕</button>
        </div>

        <div class="mt-10">
          <p class="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--app-muted)]">Workspace</p>
          <nav class="mt-4 grid gap-1 text-sm">
            <RouterLink
              to="/admin"
              class="rounded-md px-3 py-2 text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
              active-class="bg-[var(--sidebar-active)] text-[var(--app-text)]"
              @click="isSidebarOpen = false"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/admin/subjects"
              class="rounded-md px-3 py-2 text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
              active-class="bg-[var(--sidebar-active)] text-[var(--app-text)]"
              @click="isSidebarOpen = false"
            >
              Content
            </RouterLink>
            <RouterLink
              to="/admin/subjects"
              class="rounded-md px-3 py-2 text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
              active-class="bg-[var(--sidebar-active)] text-[var(--app-text)]"
              @click="isSidebarOpen = false"
            >
              Blocks
            </RouterLink>
          </nav>
        </div>

        <div class="mt-10">
          <p class="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--app-muted)]">System</p>
          <nav class="mt-4 grid gap-1 text-sm">
            <button class="rounded-md px-3 py-2 text-left text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]">
              Media
            </button>
            <button class="rounded-md px-3 py-2 text-left text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]">
              Users
            </button>
            <RouterLink
              to="/admin/settings"
              class="rounded-md px-3 py-2 text-left text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]"
              active-class="bg-[var(--sidebar-active)] text-[var(--app-text)]"
              @click="isSidebarOpen = false"
            >
              Settings
            </RouterLink>
            <button class="rounded-md px-3 py-2 text-left text-[var(--app-text)]/70 hover:bg-[var(--sidebar-active)]">
              Logs
            </button>
          </nav>
        </div>

        <div class="mt-auto rounded-md bg-[var(--app-bg)]/40 p-4 text-xs text-[var(--app-muted)]">
          Live environment • Synced with production APIs
        </div>
      </div>
    </aside>

    <div class="min-h-screen transition-all duration-300" :class="isCollapsed ? 'lg:ml-20' : 'lg:ml-72'">
      <header class="sticky top-0 z-30 border-b border-[var(--sidebar-border)] bg-[var(--sidebar-bg)]/80 backdrop-blur-md px-6 py-4 lg:px-10">
        <div class="mx-auto flex w-full max-w-6xl items-center gap-6">
          <div class="flex items-center gap-4 shrink-0">
            <button
              class="hidden h-10 w-10 items-center justify-center rounded-xl border border-[var(--sidebar-border)] transition hover:bg-[var(--sidebar-active)] lg:flex"
              @click="isCollapsed = !isCollapsed"
            >
              <MenuIcon v-if="isCollapsed" class="h-5 w-5" />
              <ChevronLeftIcon v-else class="h-5 w-5" />
            </button>
            <button class="rounded-md border border-[var(--sidebar-border)] px-3 py-2 text-xs lg:hidden" @click="isSidebarOpen = true">
              ☰ Menu
            </button>
          </div>
          <div class="flex-1 min-w-0 overflow-hidden">
            <slot name="header" />
          </div>
        </div>
      </header>

      <main class="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  ChevronLeftIcon,
  ClipboardListIcon,
  ImageIcon,
  LayersIcon,
  LayoutDashboardIcon,
  MenuIcon,
  SettingsIcon,
  UsersIcon
} from 'lucide-vue-next'
import { subjectsApi, type SubjectRecord } from './api/subjectsApi'

const isSidebarOpen = ref(false)
const isCollapsed = ref(false)
const isSubjectsOpen = ref(true)
const sidebarSubjects = ref<SubjectRecord[]>([])
const route = useRoute()

const activeSubjectId = computed(() => (route.query.subjectId || route.params.subjectId) as string | undefined)

const toggleSubjects = () => {
  isSubjectsOpen.value = !isSubjectsOpen.value
}

const loadSubjects = async () => {
  try {
    sidebarSubjects.value = await subjectsApi.list()
  } catch (error) {
    sidebarSubjects.value = []
  }
}

onMounted(() => {
  void loadSubjects()
})
</script>
