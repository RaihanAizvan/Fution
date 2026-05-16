<template>
  <aside
    v-if="toc.length"
    class="sticky top-6 h-fit overflow-y-auto pr-4"
  >
    <!-- HEADER -->
    <div class="mb-4 px-3">
      <p
        class="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--app-muted)]"
      >
        On this page
      </p>
    </div>

    <!-- TOC -->
    <nav class="relative">
      <!-- VERTICAL LINE -->
      <div
        class="absolute left-[11px] top-0 h-full w-px bg-[var(--panel-border)]"
      />

      <ul class="space-y-0.5">
        <li
          v-for="section in toc"
          :key="section.id"
        >
          <!-- ITEM -->
          <button
            type="button"
            @click="scrollToHeading(section.id)"
            :class="[
              'group relative flex w-full items-start gap-3 rounded-md py-1 text-left transition-all duration-200',
              activeHeading === section.id
                ? 'text-[var(--app-text)]'
                : 'text-[var(--app-muted)] hover:text-[var(--app-text)]'
            ]"
          >
            <!-- ACTIVE DOT -->
            <div
              :class="[
                'relative z-10 mt-[7px] h-1.5 w-1.5 rounded-full transition-all duration-300',
                activeHeading === section.id
                  ? 'scale-125 bg-blue-400'
                  : 'bg-[var(--panel-border)] group-hover:bg-[var(--app-muted)]'
              ]"
            />

            <!-- TEXT -->
            <span
              :class="[
                'leading-relaxed transition-all duration-200',
                {
                  'text-[13px] font-medium': section.level === 1,
                  'pl-3 text-[12px]': section.level === 2,
                  'pl-6 text-[11px] opacity-90': section.level === 3,
                  'pl-8 text-[11px] opacity-70': section.level >= 4,
                }
              ]"
            >
              {{ section.text }}
            </span>
          </button>

          <!-- EXPANDED CONTENT -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="
                expandedSection === section.id &&
                section.content.length
              "
              class="ml-8 mt-1 space-y-2 border-l border-[var(--panel-border)] pl-4"
            >
              <!-- LIST -->
              <template
                v-for="(item, index) in section.content"
                :key="index"
              >
                <div
                  v-if="item.type === 'list'"
                  class="space-y-1"
                >
                  <div
                    v-for="(li, liIndex) in item.items"
                    :key="liIndex"
                    class="text-[11px] leading-relaxed text-[var(--app-muted)]"
                  >
                    • {{ li }}
                  </div>
                </div>

                <!-- CODE -->
                <pre
                  v-if="item.type === 'code'"
                  class="overflow-x-auto rounded-md border border-[var(--panel-border)] bg-black/10 p-2 text-[10px] text-blue-300"
                ><code>{{ item.value }}</code></pre>
              </template>
            </div>
          </Transition>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
} from 'vue'

interface TocContent {
  type: 'list' | 'code'
  value?: string
  items?: string[]
}

interface TocSection {
  id: string
  text: string
  level: number
  content: TocContent[]
}

interface Props {
  html: string | null
}

const props = defineProps<Props>()

const toc = ref<TocSection[]>([])
const activeHeading = ref('')
const expandedSection = ref('')

const extractToc = () => {
  toc.value = []

  const content = document.querySelector('.topic-content')

  if (!content) return

  const elements = content.querySelectorAll(
    'h1,h2,h3,h4,h5,h6,ul,pre'
  )

  let currentSection: TocSection | null = null
  let headingCounter = 0

  elements.forEach((element) => {
    const tag = element.tagName.toLowerCase()

    // HEADINGS
    if (/^h[1-6]$/.test(tag)) {
      const text = element.textContent?.trim()

      if (!text) return

      const level = Number(tag[1])

      let id = element.id

      if (!id) {
        id = `heading-${headingCounter++}`
        element.id = id
      }

      currentSection = {
        id,
        text,
        level,
        content: [],
      }

      toc.value.push(currentSection)

      return
    }

    if (!currentSection) return

    // LISTS
    if (tag === 'ul') {
      const items = Array.from(
        element.querySelectorAll('li')
      )
        .map((li) => li.textContent?.trim() || '')
        .filter(Boolean)

      if (items.length) {
        currentSection.content.push({
          type: 'list',
          items,
        })
      }
    }

    // CODE
    if (tag === 'pre') {
      const code = element.textContent?.trim()

      if (code) {
        currentSection.content.push({
          type: 'code',
          value: code.slice(0, 200),
        })
      }
    }
  })
}

const scrollToHeading = (id: string) => {
  expandedSection.value =
    expandedSection.value === id ? '' : id

  const element = document.getElementById(id)

  if (!element) return

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const updateActiveHeading = () => {
  const headingElements = toc.value
    .map((heading) => document.getElementById(heading.id))
    .filter(Boolean)

  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]!
    const rect = element.getBoundingClientRect()

    if (rect.top <= 140) {
      activeHeading.value = element.id
      return
    }
  }
}

let ticking = false

const handleScroll = () => {
  if (ticking) return

  requestAnimationFrame(() => {
    updateActiveHeading()
    ticking = false
  })

  ticking = true
}

watch(
  () => props.html,
  async () => {
    await nextTick()

    setTimeout(() => {
      extractToc()
      updateActiveHeading()
    }, 100)
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, {
    passive: true,
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>