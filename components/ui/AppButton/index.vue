<template>
  <button class="app-button">
    <span
      v-if="loading"
      class="app-button__loader"
    >
      <FontAwesome
        class="burger-button"
        :icon="faSpinner"
      />
    </span>
    <slot v-else>
      {{ text }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

defineOptions({
  name: 'AppButton',
})

interface Props {
  text?: string
  primaryColor?: string
  secondaryColor?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  primaryColor: 'rgb(94 234 212)',
  secondaryColor: 'transparent',
})
</script>

<style scoped lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.app-button {
  padding: 1em;
  font-weight: 500;
  border-radius: 4rem;
  border: 1px solid v-bind(primaryColor);
  color: v-bind(primaryColor);
  background-color: v-bind(secondaryColor);
  transition: all 0.3s ease-in;
  display: flex;
  justify-content: center;

  &:hover {
    color: var(--body);
    background-color: v-bind(primaryColor);
  }

  &__loader {
    animation: rotate 1s infinite linear;
    width: 17px;
    display: block;
  }
}
</style>
