<template>
  <div class="app-banner">
    <div class="app-banner__text-wrapper container">
      <h1 class="title">
        {{ title }}
      </h1>
      <div
        class="description"
        v-html="description"
      />
    </div>
    <img
      class="app-banner__image"
      :src="bannerImage"
      alt=""
    >
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppBanner',
})

interface Props {
  title: string
  description: string
  bannerImage?: string
}

withDefaults(defineProps<Props>(), {
  bannerImage: '/img/banner.png',
})
</script>

<style scoped lang="scss">
.app-banner {
  width: 100%;
  height: 80rem;
  position: relative;
  display: flex;
  align-items: center;

  &__text-wrapper {
    color: var(--body);

    .title {
      font-size: 6rem;
      margin-bottom: 5rem;
    }

    .description {
      font-size: 3rem;
    }
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
  }
}
</style>
