<template>
  <DefaultNavigation class="desktop__navigation" />
</template>

<script setup>
import DefaultNavigation from '~/components/layout/AppHeader/DefaultNavigation.vue'

defineOptions({
  name: 'DesktopNavigation',
})
</script>

<style scoped lang="scss">
.desktop {
  &__navigation:deep {
    display: flex;
    align-items: center;
    margin-left: auto;
    & > * {
      margin-left: 3.5rem;
    }
  }
  &__github-button:deep {
    margin-left: 3.5rem;
  }
}
</style>
