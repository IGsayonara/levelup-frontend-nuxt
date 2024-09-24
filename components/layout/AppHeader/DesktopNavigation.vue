<template>
  <DefaultNavigation class="desktop__navigation" />
  <GithubButton class="desktop__github-button" />
</template>

<script setup>
import DefaultNavigation from '~/components/layout/AppHeader/DefaultNavigation.vue';
import GithubButton from '~/components/ui/AppButton/GithubButton.vue';

defineOptions({
  name: 'DesktopNavigation',
})
</script>

<style scoped lang="scss">
.desktop {
  &__navigation:deep {
    margin-left: auto;
    a {
      margin-left: 3.5rem;
    }
  }
  &__github-button:deep {
    margin-left: 3.5rem;
  }
}
</style>
