<template>
  <div
    v-if="project"
    class="app-card"
  >
    <div class="app-card__image-wrapper">
      <img
        :src="imageUrl"
        class="image"
      >
    </div>
    <div class="app-card__text-wrapper">
      <h3 class="title">
        {{ project.title }}
      </h3>
      <div class="description">
        {{ project.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/project'

defineOptions({
  name: 'AppCard',
})

interface Props {
  project: Project
}

const props = defineProps<Props>()

const project = toRef(props, 'project')

const imageUrl = computed(() => {
  return '/img/404.jpg'
})
</script>

<style lang="scss" scoped>
.app-card {
  display: flex;
  padding: 3rem;
  border: 1px solid var(--border);
  border-radius: 4rem;
  background-color: var(--body);;
  cursor: pointer;
  transition: all 0.3s ease-in;
  height: 170px;

  @include media-breakpoint-down(md){
    height: 130px;
  }

  &__image-wrapper {
    width: 15rem;
    height: 15rem;
    margin-right: 3rem;

    .image {
      width: 100%;
      height: 100%;
      min-width: 15rem;
      border: 1px solid var(--border);
      border-radius: 25%;
      transition: all 0.3s ease-in;
    }
  }

  &__text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title {
      width: 100%;
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 3rem;
      transition: all 0.3s ease-in;
    }

    .description {
      margin-bottom: auto;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    border-color: var(--highlight);
    filter: drop-shadow(1px 1px 6px var(--highlight));
  }

  &:hover & {
    &__text-wrapper {
      .title {
        //color: var(--highlight);
      }
    }

    &__image-wrapper {
      .image {
        border-color: var(--highlight);
        filter: drop-shadow(1px 1px 6px var(--highlight));
      }
    }
  }
}
</style>
