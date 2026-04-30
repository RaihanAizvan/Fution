<template>
  <div class="min-h-screen bg-[var(--app-bg)]">
    <!-- Hero Section -->
    <section
      class="relative flex flex-col items-center justify-center px-6 py-20 text-center md:py-32"
    >
      <div class="max-w-2xl">
        <h1 class="text-5xl font-bold tracking-tight text-[var(--app-text)] md:text-6xl">
          Master Web Development
        </h1>
        <p class="mt-6 text-lg text-[var(--app-muted)]">
          Build real skills with interactive learning paths. Track your progress, explore topics, and grow at your own pace.
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <RouterLink
            to="/subjects"
            class="rounded-lg bg-blue-500 px-8 py-3 font-medium text-white transition hover:bg-blue-600 hover:shadow-lg"
          >
            Explore Subjects
          </RouterLink>
          <RouterLink
            to="/settings"
            class="rounded-lg border border-[var(--panel-border)] bg-[var(--panel-bg)] px-8 py-3 font-medium text-[var(--app-text)] transition hover:bg-[var(--sidebar-active)]"
          >
            Settings
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="px-6 py-16 md:py-24">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-3xl font-bold text-[var(--app-text)] md:text-4xl">
          Why Fution?
        </h2>
        <div class="mt-12 grid gap-8 md:grid-cols-3">
          <!-- Feature 1 -->
          <div
            class="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-[var(--accent)]"
          >
            <div class="mb-4 inline-flex rounded-lg bg-[var(--sidebar-active)] p-3">
              <svg
                class="h-6 w-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-[var(--app-text)]">Progress Tracking</h3>
            <p class="mt-2 text-[var(--app-muted)]">
              Visual progress circles and checkmarks help you stay motivated as you advance.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-[var(--accent)]"
          >
            <div class="mb-4 inline-flex rounded-lg bg-[var(--sidebar-active)] p-3">
              <svg
                class="h-6 w-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-[var(--app-text)]">Customizable</h3>
            <p class="mt-2 text-[var(--app-muted)]">
              Choose from multiple themes and customize your learning environment.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-[var(--accent)]"
          >
            <div class="mb-4 inline-flex rounded-lg bg-[var(--sidebar-active)] p-3">
              <svg
                class="h-6 w-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-[var(--app-text)]">Responsive Design</h3>
            <p class="mt-2 text-[var(--app-muted)]">
              Learn on any device with a beautiful, responsive interface.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="border-t border-[var(--panel-border)] px-6 py-16 md:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold text-[var(--app-text)]">Ready to start learning?</h2>
        <p class="mt-4 text-[var(--app-muted)]">
          Begin your web development journey today and track your progress every step of the way.
        </p>
        <RouterLink
          to="/subjects"
          class="mt-8 inline-block rounded-lg bg-blue-500 px-8 py-3 font-medium text-white transition hover:bg-blue-600 hover:shadow-lg"
        >
          Explore All Subjects
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
