<template>
  <div
    v-if="project"
    class="app-card"
  >
    <div class="app-card__header">
      <div class="app-card__image-wrapper">
        <img
          :src="imageUrl"
          class="image"
        >
      </div>
      <div class="app-card__text-wrapper">
        <div class="title-wrapper">
          <h3 class="title">
            {{ project.title }}
          </h3>
          <div class="role">
            {{ userProject.role }}
          </div>
        </div>
        <div class="description">
          {{ project.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserProject } from '~/types/user-project'

defineOptions({
  name: 'FullAppCard',
})

interface Props {
  userProject: UserProject
}

const props = defineProps<Props>()

const userProject = toRef(props, 'userProject')

const project = computed(() => {
  return userProject.value.project
})

const imageUrl = computed(() => {
  return '/img/404.jpg'
})
</script>

<style lang="scss" scoped>
.app-card {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  border: 1px solid $border;
  border-radius: 4rem;
  background-color: $body;
  transition: all 0.3s ease-in;

  &__header {
    display: flex;
    margin-bottom: 3rem;
  }

  &__image-wrapper {
    width: 15rem;
    height: 15rem;
    margin-right: 3rem;

    .image {
      width: 100%;
      height: 100%;
      min-width: 15rem;
      border: 1px solid $border;
      border-radius: 25%;
      transition: all 0.3s ease-in;
    }
  }

  &__text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;

    .title-wrapper{
      display: flex;
      justify-content: space-between;
      margin-bottom: 3rem;
    }

    .title {
      font-size: 3rem;
      font-weight: bold;
      transition: all 0.3s ease-in;
    }

    .role {
      color: $strong;
      font-weight: bold;
      font-size: 2rem;
    }

  }
  .description {
  }

  &:hover {
    border-color: $highlight;
    filter: drop-shadow(1px 1px 6px $highlight);
  }

  &:hover & {
    &__text-wrapper {
      .title {
        //color: $highlight;
      }
    }

    &__image-wrapper {
      .image {
        border-color: $highlight;
        filter: drop-shadow(1px 1px 6px $highlight);
      }
    }
  }
}
</style>
