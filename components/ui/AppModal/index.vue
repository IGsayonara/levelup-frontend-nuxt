<template>
  <transition
    mode="out-in"
    @after-leave="close"
  >
    <div
      v-if="isOpen"
      class="app-modal__wrapper"
    >
      <div
        class="modal-close-overlay"
        @click="runCloseAnimation"
      />
      <div class="app-modal__wrapper-content">
        <div class="modal-content">
          <header v-if="$slots.header">
            <slot name="header" />
            <FontAwesome
              class="close-button"
              :icon="faClose"
              @click="runCloseAnimation"
            />
          </header>
          <div class="app-modal_content">
            <slot />
          </div>
          <footer v-if="$slots.footer">
            <slot name="footer">
              Footer slot
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { faClose } from '@fortawesome/free-solid-svg-icons'

defineOptions({
  name: 'AppModal',
})

const isOpen = ref(false)
const emit = defineEmits(['close'])

const runCloseAnimation = async () => {
  isOpen.value = false
  document.body.style.overflowY = 'auto'
}

const close = () => {
  emit('close')
}

onMounted(() => {
  document.body.style.overflowY = 'hidden'
  isOpen.value = true
})

onBeforeUnmount(() => {
  document.body.style.overflowY = 'auto'
})
</script>

<style scoped lang="scss">
.app-modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9997;
  background: rgba(0, 0, 0, 0.7);
}

.modal-close-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
}

.app-modal__wrapper-content {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 80%;
  height: fit-content;
  margin: auto;
  z-index: 9999;
  @include media-breakpoint-down(md) {
    width: 100%;
    height: 100%;
  }
}

.modal-content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  background: var(--body);;
  border: 1px solid var(--border);
  border-radius: 1rem;
  @include media-breakpoint-down(md) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  header {
    display: flex;
    border-bottom: 1px solid var(--border);
    .close-button {
      margin-left: auto;
      cursor: pointer;
    }
  }
  .app-modal_content {
    height: 100%;
    overflow-y: auto;
  }
  footer {
    border-top: 1px solid var(--border);
  }
  .app-modal_content,
  header,
  footer {
    padding: 2rem;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
