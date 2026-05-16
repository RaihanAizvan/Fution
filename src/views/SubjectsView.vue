<template>
  <SubjectsListShell>
    <template #default="{ query }">
      <SubjectsListNavigation :query="query" />
    </template>
  </SubjectsListShell>
</template>

<script setup lang="ts">
import SubjectsListNavigation from '../features/subjects/components/SubjectsListNavigation.vue'
import SubjectsListShell from '../features/subjects/components/SubjectsListShell.vue'
</script>
