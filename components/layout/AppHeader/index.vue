<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__wrapper">
        <div
          class="logo"
          @click="$router.push('/')"
        >
          <NuxtImg
            src="/img/logo-dark.png"
            alt="Level UP"
          />
        </div>
        <ClientOnly>
          <DesktopNavigation v-if="!isMobileNavigation" />
          <MobileNavigation v-if="isMobileNavigation" />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useViewpoint } from '~/composables/viewpoint-composable/index.ts'
import DesktopNavigation from '~/components/layout/AppHeader/DesktopNavigation.vue'
import MobileNavigation from '~/components/layout/AppHeader/MobileNavigation.vue'

const { currentBreakpoint } = useViewpoint()

defineOptions({
  name: 'AppHeader',
})

const isMobileNavigation = computed(() => {
  return ['xs', 'sm'].includes(currentBreakpoint.value)
})
</script>

<style scoped lang="scss">
.app-header {
  padding: 1rem 0;
  border-bottom: 1px solid;
  background-color: $body;;
  filter: drop-shadow(2px 2px 6px $strong);

  .logo {
    cursor: pointer;
    img {
      width: 23rem;
    }
  }

  .github-button:deep {
    margin-left: 4.5rem;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
