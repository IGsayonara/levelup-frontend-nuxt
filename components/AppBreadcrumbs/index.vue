<template>
  <section v-if="breadcrumbs" class="app-breadcrumbs">
    <div class="container">
      <span v-for="crumb in breadcrumbs" :key="crumb.text" class="crumb">
        <nuxt-link :to="{ path: crumb.to }">{{ crumb.text }}</nuxt-link>
        <span class="separator">/</span>
      </span>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AppBreadcrumbs',
};
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import type { Breadcrumb } from '~/types/breadcrumbs';

const route = useRoute();

const breadcrumbs = computed(() => {
  const metaCrumbs = route.meta?.breadCrumbs as Array<Breadcrumb>;
  return metaCrumbs?.map((el) => {
    const tempEl = { ...el };
    if (typeof tempEl.text === 'function') {
      tempEl.text = tempEl.text().value;
    }
    if (typeof tempEl.to === 'function') {
      tempEl.to = tempEl.to().value;
    }
    return tempEl;
  });
});
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
      color: $green;
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
