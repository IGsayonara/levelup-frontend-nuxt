<template>
  <section>
    <div
      v-if="!isError && project"
      class="container"
    >
      <div class="section-title-wrapper">
        <SectionTitle :title="project.title" />
      </div>
      <AppCard :project="project" />
    </div>
    <div
      v-else
      class="container"
    >
      smth went wrong
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppCard from '~/components/common/AppCard/index.vue'
import SectionTitle from '~/components/common/SectionTitle/index.vue'
import type { Project } from '~/types/project'

interface Props {
  id: number
}

defineProps<Props>()

const isError = computed(() => {
  return false
})

const project = computed(() => {
  return {} as any as Project
})
</script>
