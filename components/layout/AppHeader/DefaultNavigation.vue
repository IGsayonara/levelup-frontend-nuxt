<template>
  <nav class="navigation">
    <nuxt-link :to="{ path: '/' }">
      Home
    </nuxt-link>
    <nuxt-link :to="{ path: '/projects' }">
      Projects
    </nuxt-link>
    <nuxt-link :to="{ path: '/skills' }">
      Skills
    </nuxt-link>
    <nuxt-link
      v-if="config.public.development"
      :to="{ path: '/admin/general' }"
    >
      Profile
    </nuxt-link>
    <ThemeSwitcher />
  </nav>
</template>

<script setup>
import { useRuntimeConfig } from '#app'

defineOptions({
  name: 'DefaultNavigation',
})

const config = useRuntimeConfig()
</script>

<style scoped lang="scss">
.navigation {
  a {
    position: relative;
    color: var(--strong);
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      border-bottom: none;
    }

    &::after,
    &.router-link-active::after {
      content: '';
      position: absolute;
      top: calc(100% + 2px);
      width: 0;
      left: 0;
      height: 2px;
      background-color: var(--highlight);
      transition: all 0.3s ease-in;
    }

    &:hover::after,
    &.router-link-active::after {
      width: 100%;
    }
  }
}
</style>
