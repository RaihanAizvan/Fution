<template>
  <div class="relative w-full space-y-12">

    <!-- ================= INTRO BLOCK ================= -->
    <section v-if="introBlock" class="rounded-2xl bg-[var(--panel-bg)] px-8 py-6">
      <h2 class="text-2xl font-semibold text-[var(--app-text)]">
        {{ introBlock.title }}
      </h2>

      <p v-if="introBlock.description" class="mt-3 max-w-4xl leading-relaxed text-[var(--app-muted)]">
        {{ introBlock.description }}
      </p>
    </section>

    <!-- ================= MAIN GRID ================= -->
    <div class="
        grid gap-12
        xl:grid-cols-[minmax(0,1fr)_420px_240px]
        lg:grid-cols-[minmax(0,1fr)_360px]
        grid-cols-1
      ">

      <!-- ================= THEORY ================= -->
      <main class="space-y-16">

        <section v-for="section in theorySections" :id="section.id" :key="section.id" class="scroll-mt-32 space-y-4">
          <h2 class="text-2xl font-semibold text-[var(--app-text)]">
            {{ section.title }}
          </h2>

          <p v-if="section.description" class="leading-relaxed text-[var(--app-muted)] max-w-3xl">
            {{ section.description }}
          </p>

          <div class="h-px bg-[var(--app-border)] opacity-40" />
        </section>

      </main>

      <!-- ================= PRACTICAL ================= -->
      <aside class="
          hidden lg:block
          sticky top-28
          h-fit
          space-y-6
        ">
        <CodeBlock v-for="code in codeBlocks" :key="code.id" :language="code.language" :code="code.code" />
      </aside>

      <!-- ================= RIGHT NAV ================= -->
      <nav class="
          hidden xl:block
          sticky top-28
          h-fit
        ">
        <div class="space-y-4 rounded-2xl bg-[var(--app-surface)] p-5">
          <p class="text-xs uppercase tracking-widest text-[var(--app-muted)]">
            Navigation
          </p>

          <ul class="space-y-2">
            <li v-for="section in theorySections" :key="section.id">
              <button @click="scrollTo(section.id)" class="text-left text-sm transition-colors" :class="activeSection === section.id
                ? 'text-[var(--app-text)]'
                : 'text-[var(--app-muted)] hover:text-[var(--app-text)]'">
                {{ section.title }}
              </button>
            </li>
          </ul>
        </div>
      </nav>

    </div>

    <!-- ================= MOBILE CODE DRAWER ================= -->
    <div class="fixed bottom-6 right-6 lg:hidden">
      <button @click="showMobileCode = !showMobileCode"
        class="rounded-full bg-[var(--app-text)] px-5 py-3 text-sm font-medium text-black shadow-xl">
        {{ showMobileCode ? 'Close Code' : 'View Code' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="showMobileCode" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-6 overflow-auto lg:hidden">
        <div class="space-y-6">
          <button @click="showMobileCode = false" class="mb-4 text-sm text-white">
            Close
          </button>

          <CodeBlock v-for="code in codeBlocks" :key="code.id" :language="code.language" :code="code.code" />
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import type { TopicBlock } from '../data/topicBlocks'
import CodeBlock from '../components/blocks/CodeBlock.vue'

interface Props {
  title: string
  blocks: TopicBlock[]
}

const props = defineProps<Props>()

/* =============================
   MOBILE CODE DRAWER
============================= */

const showMobileCode = ref(false)

/* =============================
   INTRO BLOCK
============================= */

const introBlock = computed(() => {
  const block = props.blocks.find((b) => b.type === 'intro')
  if (!block) return null

  return {
    title: block.data.title,
    description: block.data.description
  }
})

/* =============================
   THEORY SECTIONS (ACCORDION ONLY)
============================= */

const theorySections = computed(() => {
  return props.blocks.flatMap((block, blockIndex) => {
    if (block.type !== 'accordion') return []

    const seed = `${block.type}-${blockIndex}`

    return block.data.items.map((item, index) => ({
      id: `${seed}-section-${index}`,
      title: item.title,
      description: item.description ?? item.content ?? ''
    }))
  })
})

/* =============================
   CODE BLOCKS
============================= */

const codeBlocks = computed(() =>
  props.blocks
    .filter((block) => block.type === 'code')
    .map((block, index) => ({
      id: `code-${index}`,
      language: block.data.language,
      code: block.data.code
    }))
)

/* =============================
   ACTIVE SECTION TRACKING
============================= */

const activeSection = ref<string | null>(null)
const observer = ref<IntersectionObserver | null>(null)

const initObserver = () => {
  observer.value?.disconnect()

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-30% 0px -60% 0px'
    }
  )

  theorySections.value.forEach((section) => {
    const el = document.getElementById(section.id)
    if (el) observer.value?.observe(el)
  })
}

onMounted(async () => {
  await nextTick()
  initObserver()
})

watch(theorySections, async () => {
  await nextTick()
  initObserver()
})

onBeforeUnmount(() => {
  observer.value?.disconnect()
})

/* =============================
   SMOOTH SCROLL
============================= */

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
</script>