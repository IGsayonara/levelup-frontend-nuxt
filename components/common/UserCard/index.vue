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
      <div class="title-wrapper">
        <h3 class="title">
          {{ user.firstName + ' ' + user.lastName }} <div>
            <div class="user-card__contact-info-mobile">
              <p class="user-card__social-links">
                <a :href="`tel:${user.phoneNumber}`">
                  <FontAwesome
                    class="burger-button"
                    :icon="faPhone"
                  />
                </a>
                <a :href="`mailto:${user.email}`">
                  <FontAwesome
                    class="burger-button"
                    :icon="faEnvelope"
                  />
                </a>
                <a
                  :href="`https://www.linkedin.com/in/ihor-didunik/`"
                  target="_blank"
                >
                  <FontAwesome
                    class="burger-button"
                    :icon="faLinkedin"
                  />
                </a>
                <a
                  :href="`https://github.com/IGsayonara`"
                  target="_blank"
                >
                  <FontAwesome
                    class="burger-button"
                    :icon="faGithub"
                  />
                </a>
                <a
                  :href="`https://www.instagram.com/ijsayonara/`"
                  target="_blank"
                >
                  <FontAwesome
                    class="burger-button"
                    :icon="faInstagram"
                  />
                </a>
                <a
                  :href="`https://wa.me/${user.phoneNumber}`"
                  target="_blank"
                >
                  <FontAwesome
                    class="burger-button"
                    :icon="faWhatsapp"
                  />
                </a>
              </p>
            </div>
          </div>
        </h3>
        <div class="role">
          Vue 3, Nuxt.js, JavaScript, TypeScript, HTML, Sass, Capacitor, Nest.js, TypeORM, PostgreSQL, Web3.js, XChain.js, Swagger, AWS, Docker, Jenkins, Github Actions Jest, Vitest, VueTestUtils, Konva.js, AEM, Pinia, Vuex, VueRouter, Scrum, SAFe,
        </div>
      </div>
    </div>
    <div class="user-card__text-wrapper">
      <div
        class="description"
        v-html="user.bio"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { faLinkedin, faGithub, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
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
  flex-direction: column;
  padding: 3rem;
  border: 1px solid var(--border);
  border-radius: 4rem;
  background-color: var(--body);;
  transition: all 0.3s ease-in;

  @include media-breakpoint-down(md){
    flex-direction: column;
  }

  &__left-bar {
    margin-right: 0;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;

    .title-wrapper{
      display: flex;
      flex-direction: column;
      margin-left: 2rem;
      gap: 2rem;
    }
  }

  .title {
    font-size: 3rem;
    font-weight: bold;
    transition: all 0.3s ease-in;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 2rem;
  }

  &__contact-info {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    gap: 0.5rem;
    & > * {
      cursor: pointer;
    }

    @include media-breakpoint-down(md){
      display: none
    }
  }

  &__social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 2rem;

    a {
      color: var(--text);
    }

    a:hover {
      color: var(--highlight);
      border-bottom: none;
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
      min-width: 18rem;
      border: 1px solid var(--border);
      border-radius: 25%;
      transition: all 0.3s ease-in;
    }

    @include media-breakpoint-down(md){
      width: 15rem;
      height: 15rem;
      .image{
        min-width: 15rem;
      }
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

      @include media-breakpoint-down(md){
        display: none;
      }
    }

    .role {
      font-size: 2rem;
    }

  }
  .description {
    //color: #808080;
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
