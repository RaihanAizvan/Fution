<template>
  <div class="topic-tabs" role="tablist" aria-label="Open topic tabs">
    <div class="topic-tabs__rail">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="topic-tabs__tab"
        :class="{ 'topic-tabs__tab--active': tab.key === activeKey }"
        role="tab"
        :aria-selected="tab.key === activeKey"
        @click="activateTab(tab)"
      >
        <FileText v-if="tab.topicSlug" class="topic-tabs__icon" />
        <PanelTop v-else class="topic-tabs__icon" />
        <span class="topic-tabs__label">{{ tab.title }}</span>
        <span
          v-if="tab.topicSlug"
          class="topic-tabs__close"
          role="button"
          tabindex="0"
          :aria-label="`Close ${tab.title}`"
          @click.stop="closeTab(tab)"
          @keydown.enter.stop.prevent="closeTab(tab)"
          @keydown.space.stop.prevent="closeTab(tab)"
        >
          <X class="h-3.5 w-3.5" />
        </span>
      </button>
    </div>

    <button
      type="button"
      class="topic-tabs__new"
      aria-label="Open blank tab"
      @click="openBlankTab"
    >
      <Plus class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { FileText, PanelTop, Plus, X } from 'lucide-vue-next'
import type { TopicSummary } from '../../../services/topics/topicsMockSource'

interface TopicTab {
  key: string
  title: string
  topicSlug: string | null
}

interface Props {
  subjectSlug: string
  activeTopicSlug: string | null
  activeTopicTitle?: string | null
  topics: TopicSummary[]
}

const props = defineProps<Props>()
const router = useRouter()
const tabs = ref<TopicTab[]>([])

const blankTab: TopicTab = {
  key: 'blank',
  title: 'New tab',
  topicSlug: null,
}

const storageKey = computed(() => `fution:${props.subjectSlug}:topic-tabs`)
const activeKey = computed(() => props.activeTopicSlug ?? blankTab.key)

const getTopicTitle = (topicSlug: string) =>
  props.activeTopicSlug === topicSlug && props.activeTopicTitle
    ? props.activeTopicTitle
    : props.topics.find((topic) => topic.id === topicSlug)?.title ?? topicSlug

const saveTabs = () => {
  const persisted = tabs.value.filter((tab) => tab.topicSlug)
  localStorage.setItem(storageKey.value, JSON.stringify(persisted))
}

const loadTabs = () => {
  try {
    const stored = localStorage.getItem(storageKey.value)
    tabs.value = stored ? JSON.parse(stored) : []
  } catch {
    tabs.value = []
  }
}

const ensureBlankTab = () => {
  if (!tabs.value.some((tab) => tab.key === blankTab.key)) {
    tabs.value = [blankTab, ...tabs.value]
  }
}

const ensureTopicTab = (topicSlug: string) => {
  const existing = tabs.value.find((tab) => tab.topicSlug === topicSlug)
  const title = getTopicTitle(topicSlug)

  if (existing) {
    existing.title = title
    return
  }

  tabs.value = [
    ...tabs.value.filter((tab) => tab.key !== blankTab.key),
    {
      key: topicSlug,
      title,
      topicSlug,
    },
  ]
  saveTabs()
}

const navigateToTab = (tab: TopicTab) => {
  if (tab.topicSlug) {
    router.push(`/subjects/${props.subjectSlug}/${tab.topicSlug}`)
    return
  }

  router.push(`/subjects/${props.subjectSlug}`)
}

const activateTab = (tab: TopicTab) => {
  navigateToTab(tab)
}

const closeTab = (tab: TopicTab) => {
  const closingActive = tab.key === activeKey.value
  const index = tabs.value.findIndex((item) => item.key === tab.key)
  tabs.value = tabs.value.filter((item) => item.key !== tab.key)
  saveTabs()

  if (!closingActive) return

  const fallback = tabs.value[index - 1] ?? tabs.value[index] ?? blankTab
  if (fallback.key === blankTab.key) ensureBlankTab()
  navigateToTab(fallback)
}

const openBlankTab = () => {
  ensureBlankTab()
  navigateToTab(blankTab)
}

watch(
  () => props.subjectSlug,
  () => {
    loadTabs()
    if (!props.activeTopicSlug) ensureBlankTab()
  },
  { immediate: true },
)

watch(
  () => [props.activeTopicSlug, props.activeTopicTitle, props.topics.length] as const,
  ([topicSlug]) => {
    if (topicSlug) {
      ensureTopicTab(topicSlug)
    } else {
      ensureBlankTab()
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (!tabs.value.length) ensureBlankTab()
})
</script>

<style scoped>
.topic-tabs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--panel-border);
  padding-bottom: 0.5rem;
}

.topic-tabs__rail {
  display: flex;
  min-width: 0;
  flex: 1;
  gap: 0.25rem;
  overflow-x: auto;
  scrollbar-width: thin;
}

.topic-tabs__tab,
.topic-tabs__new {
  display: inline-flex;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  color: var(--app-muted);
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.topic-tabs__tab {
  min-width: 8rem;
  max-width: 13rem;
  gap: 0.5rem;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0 0.5rem 0 0.75rem;
  background: var(--app-bg);
}

.topic-tabs__tab:hover,
.topic-tabs__new:hover {
  background: var(--sidebar-active);
  color: var(--app-text);
}

.topic-tabs__tab--active {
  border-color: var(--panel-border);
  border-bottom-color: transparent;
  background: var(--panel-bg);
  color: var(--app-text);
}

.topic-tabs__icon {
  height: 1rem;
  width: 1rem;
  flex: none;
}

.topic-tabs__label {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
}

.topic-tabs__close {
  display: inline-flex;
  height: 1.5rem;
  width: 1.5rem;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: var(--app-muted);
}

.topic-tabs__close:hover {
  background: var(--sidebar-active);
  color: var(--app-text);
}

.topic-tabs__new {
  width: 2.25rem;
  flex: none;
  border-radius: 0.5rem;
  border-color: var(--panel-border);
  background: var(--panel-bg);
}
</style>
