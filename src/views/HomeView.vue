<template>
  <div class="min-h-screen bg-[var(--app-bg)]">
    <!-- Hero Section -->
    <section class="relative px-6 py-20 text-center md:py-32">
      <div class="mx-auto max-w-4xl">
        <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--panel-border)] bg-[var(--panel-bg)] px-4 py-2 text-sm text-[var(--app-muted)]">
          <svg class="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          Welcome to Fution
        </div>

        <h1 class="text-5xl font-bold tracking-tight text-[var(--app-text)] md:text-7xl">
          Master Web Development
          <span class="block text-blue-500">at Your Own Pace</span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-lg text-[var(--app-muted)] md:text-xl">
          Build real skills with interactive learning paths. Track your progress, explore topics, and grow at your own pace with our comprehensive web development curriculum.
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <RouterLink
            to="/subjects"
            class="group inline-flex items-center gap-3 rounded-xl bg-blue-500 px-8 py-4 font-semibold text-white transition hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <span>Start Learning</span>
            <svg class="h-5 w-5 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </RouterLink>

          <button
            type="button"
            @click="$emit('open-settings')"
            class="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel-bg)] px-8 py-4 font-semibold text-[var(--app-text)] transition hover:bg-[var(--sidebar-active)]"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Customize Theme</span>
          </button>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="h-6 w-6 text-[var(--app-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="px-6 py-16 md:py-24">
      <div class="mx-auto max-w-7xl">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-[var(--app-text)] md:text-5xl">
            Why Choose Fution?
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-[var(--app-muted)] md:text-lg">
            Everything you need to become a proficient web developer, all in one place.
          </p>
        </div>

        <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Feature 1 -->
          <div class="group rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
              <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--app-text)]">Progress Tracking</h3>
            <p class="mt-3 text-[var(--app-muted)] leading-relaxed">
              Visual progress indicators and completion tracking help you stay motivated and see your growth over time.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="group rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
              <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--app-text)]">Customizable Experience</h3>
            <p class="mt-3 text-[var(--app-muted)] leading-relaxed">
              Choose from multiple themes, customize your learning environment, and adapt the platform to your preferences.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="group rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
              <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--app-text)]">Responsive Design</h3>
            <p class="mt-3 text-[var(--app-muted)] leading-relaxed">
              Learn on any device with our beautiful, responsive interface that works perfectly on desktop, tablet, and mobile.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="group rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
              <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--app-text)]">Interactive Learning</h3>
            <p class="mt-3 text-[var(--app-muted)] leading-relaxed">
              Engage with interactive examples, code playgrounds, and hands-on exercises that reinforce your learning.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="group rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
              <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--app-text)]">Comprehensive Curriculum</h3>
            <p class="mt-3 text-[var(--app-muted)] leading-relaxed">
              From HTML basics to advanced JavaScript concepts, our structured curriculum covers everything you need to know.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="group rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 transition hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
              <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--app-text)]">Community Driven</h3>
            <p class="mt-3 text-[var(--app-muted)] leading-relaxed">
              Join a community of learners and developers. Share your progress, ask questions, and learn together.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="border-t border-[var(--panel-border)] bg-[var(--panel-bg)] px-6 py-16 md:py-24">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-8 md:grid-cols-3">
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-500 md:text-5xl">50+</div>
            <div class="mt-2 text-[var(--app-muted)]">Learning Topics</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-500 md:text-5xl">3</div>
            <div class="mt-2 text-[var(--app-muted)]">Themes Available</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-500 md:text-5xl">∞</div>
            <div class="mt-2 text-[var(--app-muted)]">Learning Possibilities</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="border-t border-[var(--panel-border)] px-6 py-16 md:py-24">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-3xl font-bold text-[var(--app-text)] md:text-5xl">
          Ready to Start Your Journey?
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-[var(--app-muted)] md:text-lg">
          Join thousands of developers who have accelerated their careers with Fution. Start learning today and unlock your potential.
        </p>
        <RouterLink
          to="/subjects"
          class="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-500 px-10 py-4 font-semibold text-white transition hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/25"
        >
          <span>Explore Subjects</span>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineEmits<{
  'open-settings': []
}>()
</script>
