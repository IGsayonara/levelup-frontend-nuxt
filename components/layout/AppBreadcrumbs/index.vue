<template>
  <section
    v-if="breadcrumbs && breadcrumbs.length"
    class="app-breadcrumbs"
  >
    <div class="container">
      <span
        v-for="crumb in breadcrumbs"
        :key="crumb.to"
        class="crumb"
      >
        <NuxtLink :to="{ path: crumb.to }">{{ crumb.text }}</NuxtLink>
        <span class="separator">/</span>
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/types/breadcrumbs'

defineOptions({
  name: 'AppBreadcrumbs',
})

withDefaults(defineProps<{ breadcrumbs: Breadcrumb[] }>(), { breadcrumbs: () => [] })
</script>

<style scoped lang="scss">
.app-breadcrumbs {
  margin-top: 5rem;
  .crumb {
    font-weight: 500;
    a {
      font-weight: inherit;
      margin: 0 10px;
    }
    .separator {
      color: $highlight;
    }
    &:first-child a {
      margin-left: 0;
    }
    &:last-child {
      a {
        pointer-events: none;
      }
      .separator {
        display: none;
      }
    }
  }
}
</style>
