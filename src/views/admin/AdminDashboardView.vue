<template>
  <AdminLayout>
    <template #header>
      <div>
        <h2 class="text-3xl font-semibold">Dashboard</h2>
        <p class="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">
          System Overview & Analytics
        </p>
      </div>
    </template>

    <div class="grid gap-6">
      <!-- Stats Grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label" class="rounded-2xl bg-[var(--panel-bg)] p-6 shadow-sm transition hover:shadow-md">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--app-bg)] text-[var(--sidebar-active)]">
              <component :is="stat.icon" class="h-6 w-6" />
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wider text-[var(--app-muted)]">{{ stat.label }}</p>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-2 text-xs">
            <span class="font-medium text-emerald-400">{{ stat.trend }}</span>
            <span class="text-[var(--app-muted)]">vs last month</span>
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Recent Activity -->
        <div class="lg:col-span-2 rounded-2xl bg-[var(--panel-bg)] p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold">Recent Activity</h3>
            <button class="text-xs font-medium text-[var(--sidebar-active)] hover:underline">View All</button>
          </div>
          <div class="space-y-6">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex gap-4">
              <div class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--app-bg)]">
                <component :is="activity.icon" class="h-5 w-5 text-[var(--app-muted)]" />
                <div v-if="activity.status === 'online'" class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--panel-bg)] bg-emerald-500"></div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <p class="text-sm font-semibold truncate">{{ activity.user }}</p>
                  <span class="text-[10px] uppercase tracking-wider text-[var(--app-muted)]">{{ activity.time }}</span>
                </div>
                <p class="text-xs text-[var(--app-muted)] mt-0.5 line-clamp-1">
                  {{ activity.action }} <span class="text-[var(--app-text)] font-medium">{{ activity.target }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- System Status -->
        <div class="rounded-2xl bg-[var(--panel-bg)] p-6">
          <h3 class="text-lg font-semibold mb-6">System Health</h3>
          <div class="space-y-6">
            <div v-for="service in services" :key="service.name" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="font-medium">{{ service.name }}</span>
                <span :class="service.status === 'Operational' ? 'text-emerald-400' : 'text-amber-400'">{{ service.status }}</span>
              </div>
              <div class="h-1.5 w-full rounded-full bg-[var(--app-bg)] overflow-hidden">
                <div 
                  class="h-full rounded-full bg-gradient-to-r transition-all duration-500"
                  :class="service.status === 'Operational' ? 'from-emerald-500 to-emerald-400' : 'from-amber-500 to-amber-400'"
                  :style="{ width: service.uptime + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-[10px] text-[var(--app-muted)]">
                <span>Uptime: {{ service.uptime }}%</span>
                <span>Latency: {{ service.latency }}ms</span>
              </div>
            </div>
          </div>

          <div class="mt-8 rounded-xl bg-indigo-500/10 p-4 border border-indigo-500/20">
            <div class="flex items-center gap-3">
              <div class="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>
              <p class="text-xs font-medium text-indigo-300">All systems are currently stable.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../../admin/AdminLayout.vue'
import { 
  LayersIcon, 
  FileTextIcon, 
  UsersIcon, 
  EyeIcon,
  PlusCircleIcon,
  Edit3Icon,
  CheckCircle2Icon
} from 'lucide-vue-next'

const stats = [
  { label: 'Total Subjects', value: '12', trend: '+2', icon: LayersIcon },
  { label: 'Total Topics', value: '84', trend: '+12', icon: FileTextIcon },
  { label: 'Active Users', value: '1.2k', trend: '+15%', icon: UsersIcon },
  { label: 'Total Views', value: '45.2k', trend: '+22%', icon: EyeIcon },
]

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Published new topic', target: 'Introduction to Vue 3', time: '2 mins ago', icon: PlusCircleIcon, status: 'online' },
  { id: 2, user: 'Sarah Wilson', action: 'Updated content in', target: 'Tailwind CSS Mastery', time: '15 mins ago', icon: Edit3Icon, status: 'idle' },
  { id: 3, user: 'System Bot', action: 'Backups completed for', target: 'Content Database', time: '1 hour ago', icon: CheckCircle2Icon, status: 'online' },
  { id: 4, user: 'Mike Ross', action: 'Created new subject', target: 'Advanced TypeScript', time: '3 hours ago', icon: LayersIcon, status: 'offline' },
]

const services = [
  { name: 'API Server', status: 'Operational', uptime: 99.9, latency: 42 },
  { name: 'Database', status: 'Operational', uptime: 100, latency: 12 },
  { name: 'Assets Storage', status: 'Operational', uptime: 99.5, latency: 85 },
  { name: 'Search Engine', status: 'Degraded', uptime: 82.4, latency: 450 },
]
</script>
