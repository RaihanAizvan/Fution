<template>
  <div class="min-h-screen bg-[#0f0f12] text-white">
    <aside class="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-[#141414] lg:block">
      <div class="flex h-full flex-col px-6 py-8">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-white/40">Admin</p>
          <h1 class="mt-2 text-xl font-semibold">Content Studio</h1>
          <p class="mt-1 text-xs text-white/40">Premium CMS Workspace</p>
        </div>

        <div class="mt-10">
          <p class="text-[0.65rem] uppercase tracking-[0.3em] text-white/30">Workspace</p>
          <nav class="mt-4 grid gap-1 text-sm">
            <RouterLink
              to="/admin"
              class="rounded-md px-3 py-2 text-white/70 hover:bg-white/5"
              active-class="bg-white/10 text-white"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/admin/subjects"
              class="rounded-md px-3 py-2 text-white/70 hover:bg-white/5"
              active-class="bg-white/10 text-white"
            >
              Content
            </RouterLink>
            <RouterLink
              to="/admin/subjects"
              class="rounded-md px-3 py-2 text-white/70 hover:bg-white/5"
              active-class="bg-white/10 text-white"
            >
              Blocks
            </RouterLink>
          </nav>
        </div>

        <div class="mt-10">
          <p class="text-[0.65rem] uppercase tracking-[0.3em] text-white/30">System</p>
          <nav class="mt-4 grid gap-1 text-sm">
            <button class="rounded-md px-3 py-2 text-left text-white/70 hover:bg-white/5">
              Media
            </button>
            <button class="rounded-md px-3 py-2 text-left text-white/70 hover:bg-white/5">
              Users
            </button>
            <button class="rounded-md px-3 py-2 text-left text-white/70 hover:bg-white/5">
              Settings
            </button>
            <button class="rounded-md px-3 py-2 text-left text-white/70 hover:bg-white/5">
              Logs
            </button>
          </nav>
        </div>

        <div class="mt-auto rounded-md bg-black/40 p-4 text-xs text-white/50">
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
      class="fixed left-0 top-0 z-50 h-screen w-72 bg-[#141414] px-6 py-8 transition-transform lg:hidden"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-white/40">Admin</p>
            <h1 class="mt-2 text-xl font-semibold">Content Studio</h1>
          </div>
          <button class="text-white/60" @click="isSidebarOpen = false">✕</button>
        </div>

        <div class="mt-10">
          <p class="text-[0.65rem] uppercase tracking-[0.3em] text-white/30">Workspace</p>
          <nav class="mt-4 grid gap-1 text-sm">
            <RouterLink
              to="/admin"
              class="rounded-md px-3 py-2 text-white/70 hover:bg-white/5"
              active-class="bg-white/10 text-white"
              @click="isSidebarOpen = false"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/admin/subjects"
              class="rounded-md px-3 py-2 text-white/70 hover:bg-white/5"
              active-class="bg-white/10 text-white"
              @click="isSidebarOpen = false"
            >
              Content
            </RouterLink>
            <RouterLink
              to="/admin/subjects"
              class="rounded-md px-3 py-2 text-white/70 hover:bg-white/5"
              active-class="bg-white/10 text-white"
              @click="isSidebarOpen = false"
            >
              Blocks
            </RouterLink>
          </nav>
        </div>

        <div class="mt-10">
          <p class="text-[0.65rem] uppercase tracking-[0.3em] text-white/30">System</p>
          <nav class="mt-4 grid gap-1 text-sm">
            <button class="rounded-md px-3 py-2 text-left text-white/70 hover:bg-white/5">
              Media
            </button>
            <button class="rounded-md px-3 py-2 text-left text-white/70 hover:bg-white/5">
              Users
            </button>
            <button class="rounded-md px-3 py-2 text-left text-white/70 hover:bg-white/5">
              Settings
            </button>
            <button class="rounded-md px-3 py-2 text-left text-white/70 hover:bg-white/5">
              Logs
            </button>
          </nav>
        </div>

        <div class="mt-auto rounded-md bg-black/40 p-4 text-xs text-white/50">
          Live environment • Synced with production APIs
        </div>
      </div>
    </aside>

    <div class="min-h-screen lg:ml-72">
      <header class="border-b border-white/10 bg-[#141414] px-6 py-6 lg:px-10">
        <div class="mx-auto flex w-full max-w-6xl flex-col gap-4">
          <div class="flex items-center justify-between lg:hidden">
            <button class="rounded-md border border-white/10 px-3 py-2 text-xs" @click="isSidebarOpen = true">
              ☰ Menu
            </button>
          </div>
          <slot name="header" />
        </div>
      </header>

      <main class="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isSidebarOpen = ref(false)
</script>
