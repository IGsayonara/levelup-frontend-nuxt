<template>
  <div>
    <AppModal
      v-if="isOpen"
      @close="close"
    >
      <template #header />
      <template #default>
        <div class="mobile__navigation-wrapper">
          <DefaultNavigation class="mobile__navigation" />
        </div>
      </template>
    </AppModal>
    <FontAwesome
      class="burger-button"
      :icon="faBars"
      @click="open"
    />
  </div>
</template>

<script setup>
import { faBars } from '@fortawesome/free-solid-svg-icons'

import DefaultNavigation from '~/components/layout/AppHeader/DefaultNavigation.vue'

defineOptions({
  name: 'MobileNavigation',
})

const route = useRoute()

const isOpen = ref(false)

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

watch(() => route.name, () => {
  isOpen.value = false
})
</script>

<style scoped lang="scss">
.mobile {
  &__navigation:deep {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
      margin-bottom: 3.5rem;
    }
  }
}
.mobile__navigation-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: auto 0;
}
.burger-button {
  cursor: pointer;
}
</style>
