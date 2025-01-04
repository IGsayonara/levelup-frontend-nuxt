<template>
  <div>
    <div class="row">
      <div class="col-md-9">
        <div class="row">
          <div class="col-6">
            <AppInput
              id="firstName"
              v-model="user.firstName"
              label="First name"
            />
          </div>
          <div class="col-6">
            <AppInput
              id="lastName"
              v-model="user.lastName"
              label="Last name"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ClientOnly>
              <Froala
                id="edit"
                v-model:value="user.bio"
                label="Bio"
                :tag="'textarea'"
              />
            </ClientOnly>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
              id="address"
              v-model="user.address"
              label="Address"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
              id="email"
              v-model="user.email"
              label="Email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
              id="phone"
              v-model="user.phoneNumber"
              label="Phone number"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
              id="birthday"
              v-model="user.dateOfBirth"
              label="Date of birth"
              type="date"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppButton @click="update">
              Update
            </AppButton>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row">
          <div class="col-12">
            <!-- Image that triggers file input dialog on click -->
            <img
              :src="profileImage"
              :alt="user.firstName + user.lastName"
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
                <AppButton @click="onUpdate">
                  Update
                </AppButton>
              </template>
            </AppModal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

import { useGeneralSettings } from '~/components/common/admin/GeneralSettings/general-settings.composable'

const { user, update, profileImage, updateProfileImage } = useGeneralSettings()

const cropperImage = ref()

const profileImageRef = ref<HTMLInputElement | null>(null)
const isCropperModalShowing = ref(false)

const triggerFileInput = () => {
  // Trigger file input click programmatically
  profileImageRef.value?.click()
}

const onUpdate = async () => {
  const file = await cropper?.getFile()
  if (file) {
    await updateProfileImage(file)
    profileImage.value = cropper?.getDataURL()
    isCropperModalShowing.value = false
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
  .row {
    margin: 3rem 0;
  }
</style>
