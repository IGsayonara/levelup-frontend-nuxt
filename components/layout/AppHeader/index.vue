<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__wrapper">
        <div
          class="logo"
          @click="$router.push('/')"
        >
          <NuxtImg
            v-show="isDark"
            :src="'/img/logo-dark.png'"
            alt="Level UP"
          />
          <NuxtImg
            v-show="!isDark"
            :src="'/img/logo.png'"
            alt="Level UP"
          />
        </div>

        <DesktopNavigation class="desktopNavigation" />
        <MobileNavigation class="mobileNavigation" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import DesktopNavigation from '~/components/layout/AppHeader/DesktopNavigation.vue'
import MobileNavigation from '~/components/layout/AppHeader/MobileNavigation.vue'

defineOptions({
  name: 'AppHeader',
})

// const { currentBreakpoint } = useViewpoint()
// const isMobileNavigation = computed(() => {
//   return ['xs', 'sm'].includes(currentBreakpoint.value)
// })

const { isDark } = useTheme()
</script>

<style scoped lang="scss">
.app-header {
  padding: 1rem 0;
  border-bottom: 1px solid;
  background-color: var(--body);;
  filter: drop-shadow(2px 2px 6px var(--strong));

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

  @include media-breakpoint-down(md){
    .desktopNavigation {
      display: none !important;
    }
  }

  @include media-breakpoint-up(md){
    .mobileNavigation {
      display: none !important;
    }
  }
}
</style>
