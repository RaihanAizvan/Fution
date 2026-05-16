<template>
  <div
    class="min-h-screen overflow-x-hidden bg-[var(--app-bg)] selection:bg-indigo-500/30 text-[var(--app-text)] font-sans">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-40">
      <!-- Ambient Background Glows -->
      <div class="absolute -top-24 -left-20 h-[500px] w-[500px] rounded-full bg-[var(--hero-glow)] blur-[120px]"></div>
      <div
        class="absolute top-1/2 -right-20 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--hero-glow-secondary)] blur-[100px]">
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="flex flex-col items-center text-center">
          <div
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--panel-bg)]/50 px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--app-muted)] md:text-sm animate-fade-in">
            <span class="flex h-2 w-2 rounded-full bg-[var(--cta-bg)] animate-pulse"></span>
            NEW: Interactive Markdown Studio is Live
          </div>

          <h1
            class="max-w-4xl text-5xl font-extrabold tracking-tight text-[var(--app-text)] md:text-8xl lg:leading-[1.1]">
            The <span :style="{ backgroundImage: 'var(--accent-gradient)' }"
              class="bg-clip-text text-transparent">FUT</span>ure of Educat<span
              :style="{ backgroundImage: 'var(--accent-gradient)' }" class="bg-clip-text text-transparent">ION</span> Is
            Here.
          </h1>

          <p class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--app-muted)] md:text-xl">
            Fution is a high-performance, markdown-driven learning engine designed for the next generation of
            developers. Experience content that's not just read, but mastered.
          </p>

          <div class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RouterLink to="/subjects"
              class="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-[var(--app-text)] px-8 py-4 font-bold text-[var(--app-bg)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_var(--hero-glow)] active:scale-[0.98]">
              <span>Explore Curriculum</span>
              <ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </RouterLink>

            <BorderGlow :edgeSensitivity="30" glowColor="40 80 80" backgroundColor="transparent" :borderRadius="18"
              :glowRadius="10" :glowIntensity="0.9" :coneSpread="25" :animated="true"
              :colors="['#424ac1', '#7779be', '#3723d0']" className="rounded-2xl">
              <button type="button" @click="$emit('open-settings')"
                class="group inline-flex items-center gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--panel-bg)]/60 px-8 py-4 font-bold text-[var(--app-text)] backdrop-blur-xl transition-all  active:scale-[0.98]">
                <Palette class="h-5 w-5 text-[var(--app-muted)]" />
                <span>Personalize Interface</span>
              </button>
            </BorderGlow>
          </div>

          <!-- Social Proof / Trusted By -->
          <div class="mt-20 flex flex-col items-center gap-6">
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-[var(--app-muted)]/60">Built for modern stacks
            </p>
            <div
              class="flex flex-wrap justify-center gap-8 opacity-40 grayscale transition hover:grayscale-0 hover:opacity-100 md:gap-12">
              <div class="flex items-center gap-2 font-bold text-[var(--app-text)]">VUE.JS</div>
              <div class="flex items-center gap-2 font-bold text-[var(--app-text)]">VITE</div>
              <div class="flex items-center gap-2 font-bold text-[var(--app-text)]">PRISMA</div>
              <div class="flex items-center gap-2 font-bold text-[var(--app-text)]">TAILWIND</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid Features Section -->
    <section class="px-6 py-20 bg-[var(--panel-bg)]/40 border-y border-[var(--app-border)]">
      <div class="container mx-auto max-w-7xl">
        <div class="mb-16">
          <h2 class="text-3xl font-bold tracking-tight text-[var(--app-text)] md:text-5xl">Engineered for Mastery.</h2>
          <p class="mt-4 text-lg text-[var(--app-muted)]">A learning platform that feels like a professional IDE.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-12 md:grid-rows-2">
          <!-- Main Feature Card -->
          <div
            class="relative overflow-hidden rounded-[2.5rem] border border-[var(--app-border)] bg-gradient-to-br from-[var(--panel-bg)] to-[var(--app-bg)] p-8 md:col-span-8 md:row-span-1 group">
            <div class="relative z-10">
              <div
                class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--hero-glow)] text-[var(--app-text)]">
                <Code2 class="h-6 w-6" />
              </div>
              <h3 class="text-2xl font-bold text-[var(--app-text)]">Markdown-Driven content</h3>
              <p class="mt-3 max-w-md text-[var(--app-muted)] leading-relaxed">
                Experience high-fidelity learning materials pre-rendered for performance. Our engine handles complex
                code blocks and typography flawlessly.
              </p>
            </div>
            <div class="absolute right-0 bottom-0 top-0 hidden w-1/3 overflow-hidden lg:block">
              <div class="absolute inset-0 bg-gradient-to-l from-[var(--app-bg)] to-transparent z-10"></div>
              <div
                class="h-full w-full bg-[var(--hero-glow)] opacity-20 transition-transform group-hover:scale-110 duration-700">
              </div>
            </div>
          </div>

          <!-- Secondary Card 1 -->
          <div
            class="rounded-[2.5rem] border border-[var(--app-border)] bg-[var(--panel-bg)]/30 p-8 md:col-span-4 transition hover:bg-[var(--panel-bg)]/60 group">
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--hero-glow)] text-[var(--app-text)] transition-all group-hover:scale-110">
              <Sparkles class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-[var(--app-text)]">Dynamic Themes</h3>
            <p class="mt-3 text-sm text-[var(--app-muted)] leading-relaxed">
              Tailor your focus with curated themes. Dark, Light, Blue Ocean, or Cyber Purple.
            </p>
          </div>

          <!-- Secondary Card 2 -->
          <div
            class="rounded-[2.5rem] border border-[var(--app-border)] bg-[var(--panel-bg)]/30 p-8 md:col-span-4 transition hover:bg-[var(--panel-bg)]/60 group">
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--hero-glow)] text-[var(--app-text)] transition-all group-hover:scale-110">
              <Zap class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-[var(--app-text)]">Real-time Sync</h3>
            <p class="mt-3 text-sm text-[var(--app-muted)] leading-relaxed">
              Your progress and preferences are synced instantly across all your devices.
            </p>
          </div>

          <!-- Tertiary Card (Long) -->
          <div
            class="flex flex-col justify-between rounded-[2.5rem] border border-[var(--app-border)] bg-gradient-to-tr from-[var(--hero-glow)] to-[var(--app-bg)] p-8 md:col-span-8 group">
            <div>
              <div
                class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--panel-bg)] text-[var(--app-text)]">
                <Layout class="h-6 w-6" />
              </div>
              <h3 class="text-2xl font-bold text-[var(--app-text)]">Premium Content Studio</h3>
              <p class="mt-3 max-w-sm text-[var(--app-muted)] leading-relaxed">
                For educators and admins: a split-pane markdown editor with instant preview and versioning support.
              </p>
            </div>
            <div
              class="mt-8 flex items-center gap-4 overflow-hidden rounded-2xl bg-[var(--panel-bg)]/40 p-4 border border-[var(--app-border)]">
              <div class="flex -space-x-3">
                <div class="h-8 w-8 rounded-full border-2 border-[var(--app-bg)] bg-blue-500"></div>
                <div class="h-8 w-8 rounded-full border-2 border-[var(--app-bg)] bg-purple-500"></div>
                <div class="h-8 w-8 rounded-full border-2 border-[var(--app-bg)] bg-emerald-500"></div>
              </div>
              <div class="text-xs text-[var(--app-muted)]">Trusted by over <span
                  class="text-[var(--app-text)] font-bold">12,000+</span> knowledge seekers.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats / Trust Indicators -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="grid gap-12 md:grid-cols-3 text-center">
          <div class="flex flex-col items-center">
            <span class="text-5xl font-black text-[var(--app-text)] md:text-7xl">12+</span>
            <p class="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--app-muted)]">Primary Subjects</p>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-5xl font-black text-[var(--app-text)] md:text-7xl">84%</span>
            <p class="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--app-muted)]">Completion rate</p>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-5xl font-black text-[var(--app-text)] md:text-7xl">0ms</span>
            <p class="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--app-muted)]">Latency rendering</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden px-6 py-28">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_35%)]">
      </div>

      <div
        class="relative mx-auto flex max-w-6xl flex-col gap-12 rounded-[2.5rem] border border-[var(--app-border)] bg-[var(--panel-bg)]/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur md:flex-row md:items-center md:justify-between md:p-14">

        <div class="max-w-2xl">
          <span
            class="inline-flex items-center rounded-full border border-[var(--app-border)] bg-[var(--app-bg)]/50 px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--app-muted)]">
            Knowledge engineered better
          </span>

          <h2 class="mt-6 text-4xl font-black leading-tight tracking-tight text-[var(--app-text)] md:text-6xl">
            Less clutter. <br />
            More momentum.
          </h2>

          <p class="mt-6 max-w-xl text-lg leading-relaxed text-[var(--app-muted)]">
            A workspace where lessons breathe, code feels readable, and progress moves like a quiet machine in the dark.
            No noise. Just depth, structure, and flow.
          </p>

          <div class="mt-10 flex flex-col gap-4 sm:flex-row">
            <RouterLink to="/subjects"
              class="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 px-8 py-4 text-sm font-bold text-white transition duration-200 hover:scale-[1.02] active:scale-95">
              Start Exploring
            </RouterLink>

            <RouterLink to="/dashboard"
              class="inline-flex items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)]/40 px-8 py-4 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--sidebar-active)] active:scale-95">
              View Dashboard
            </RouterLink>
          </div>
        </div>

        <div class="grid w-full max-w-sm gap-4">
          <div class="rounded-3xl border border-[var(--app-border)] bg-[var(--app-bg)]/50 p-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-[var(--app-muted)]">
                Weekly consistency
              </p>
              <span class="text-sm font-bold text-emerald-400">87%</span>
            </div>

            <div class="mt-5 h-3 overflow-hidden rounded-full bg-[var(--sidebar-active)]">
              <div class="h-full w-[87%] rounded-full bg-emerald-400"></div>
            </div>
          </div>

          <div class="rounded-3xl border border-[var(--app-border)] bg-[var(--app-bg)]/50 p-6">
            <p class="text-sm font-semibold text-[var(--app-muted)]">
              Active learning paths
            </p>

            <div class="mt-5 flex items-end gap-2">
              <span class="h-12 w-full rounded-xl bg-sky-400/80"></span>
              <span class="h-20 w-full rounded-xl bg-violet-400/80"></span>
              <span class="h-16 w-full rounded-xl bg-amber-300/80"></span>
              <span class="h-24 w-full rounded-xl bg-emerald-400/80"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Simple -->
    <footer class="border-t border-[var(--app-border)] py-12 px-6">
      <div class="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
        <div class="flex flex-col leading-none">
          <span class="text-xl font-black text-[var(--app-text)]">FUTION</span>
          <span class="text-[10px] mt-1 uppercase tracking-[0.2em] text-[var(--app-muted)]">Future of Education</span>
        </div>
        <p class="text-sm text-[var(--app-muted)]">© 2024 Fution Engine. All rights reserved.</p>
        <div
          class="flex gap-6 text-sm font-medium text-[var(--app-muted)] hover:text-[var(--app-text)] transition cursor-pointer">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Github</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BorderGlow from './components/BorderGlow.vue'
import {
  ArrowRight,
  Code2,
  Layout,
  Palette,
  Sparkles,
  Zap
} from 'lucide-vue-next'

defineEmits<{
  'open-settings': []
}>()
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom selection color */
::selection {
  background-color: var(--hero-glow);
  color: var(--app-text);
}
</style>
