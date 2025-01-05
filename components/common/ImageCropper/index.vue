<template>
  <div>
    <!-- Image that triggers file input dialog on click -->
    <img
      :src="imageUrl || '/img/404.jpg'"
      style="cursor: pointer;"
      @click="triggerFileInput"
    >
    <!-- Hidden file input -->
    <input
      ref="profileImageRef"
      type="file"
      hidden
      @change="handleFileChange"
    >
    <AppModal
      v-if="isCropperModalShowing"
      @close="isCropperModalShowing = false"
    >
      <template #header>
        <h2>Edit image</h2>
      </template>
      <template #default>
        <VuePictureCropper
          :box-style="{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f8f8',
            margin: 'auto',
          }"
          :img="cropperImage"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 1,
          }"
        />
      </template>
      <template #footer>
        <AppButton
          :loading="isLoading"
          @click="onUpdate"
        >
          Update
        </AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

const props = defineProps<{ imageUrl: string, cropCallback: (file: File) => unknown }>()
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

const profileImageRef = ref<HTMLInputElement | null>(null)
const isCropperModalShowing = ref(false)
const cropperImage = ref<string>()
const isLoading = ref(false)

const triggerFileInput = () => {
  // Trigger file input click programmatically
  profileImageRef.value?.click()
}

const onUpdate = async () => {
  try {
    isLoading.value = true
    const file = await cropper?.getFile()
    if (file) {
      await props.cropCallback(file)
      emit('update', cropper?.getDataURL() || '')

      isCropperModalShowing.value = false
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files ? input.files[0] : null
  if (file) {
    // Update the profile image or handle the file
    cropperImage.value = URL.createObjectURL(file)
    isCropperModalShowing.value = true
  }
}
</script>

<style scoped lang="scss">

</style>
