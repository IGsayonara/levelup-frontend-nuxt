<template>
  <div
    v-if="user"
    class="user-card"
  >
    <div class="user-card__left-bar">
      <div class="user-card__image-wrapper">
        <img
          :src="imageUrl"
          class="image"
        >
      </div>
      <div class="user-card__contact-info">
        <p>
          <a :href="`mailto:${user.email}`">
            {{ user.email }}
          </a>
        </p>
        <p>
          <a :href="`tel:${user.phoneNumber}`">
            {{ user.phoneNumber }}
          </a>
        </p>
      </div>
    </div>
    <div class="user-card__text-wrapper">
      <div class="title-wrapper">
        <h3 class="title">
          {{ user.firstName + ' ' + user.lastName }}
        </h3>
        <div class="role">
          @{{ user.username }}
        </div>
      </div>
      <div
        class="description"
        v-html="user.bio"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

defineOptions({
  name: 'UserCard',
})

interface Props {
  user: User
}

const props = defineProps<Props>()

const imageUrl = computed(() => {
  return props.user.profileImage || '/img/404.jpg'
})
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  flex-direction: row;
  padding: 3rem;
  border: 1px solid #e5e5e5;
  border-radius: 4rem;
  background-color: white;
  transition: all 0.3s ease-in;

  &__left-bar {
    margin-right: 3rem;
  }

  &__contact-info {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    gap: 0.5rem;
    & > * {
      cursor: pointer;
    }
  }

  &__header {
    display: flex;
    margin-bottom: 3rem;
  }

  &__image-wrapper {
    width: 18rem;
    height: 18rem;

    .image {
      width: 100%;
      height: 100%;
      min-width: 15rem;
      border: 1px solid #e5e5e5;
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
      justify-content: flex-start;
      align-items: baseline;
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .title {
      font-size: 3rem;
      font-weight: bold;
      transition: all 0.3s ease-in;
    }

    .role {
      font-size: 2rem;
    }

  }
  .description {
    //color: #808080;
  }

  //&:hover {
  //  border-color: $orange;
  //  filter: drop-shadow(1px 1px 6px $orange);
  //}

  //&:hover & {
  //  &__text-wrapper {
  //    .title {
  //      color: $orange;
  //    }
  //  }
  //
  //  &__image-wrapper {
  //    .image {
  //      border-color: $orange;
  //      filter: drop-shadow(1px 1px 6px $orange);
  //    }
  //  }
  //}
}
</style>
