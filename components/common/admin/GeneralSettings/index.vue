<template>
  <div class="mt-3">
    <div class="row">
      <div class="col-md-9">
        <div class="row">
          <div class="col-6">
            <AppInput
              v-model="user.firstName"
              label="First name"
            />
          </div>
          <div class="col-6">
            <AppInput
              v-model="user.lastName"
              label="Last name"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
              v-model="user.bio"
              label="Bio"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
              v-model="user.address"
              label="Address"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
              v-model="user.email"
              label="Email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
              v-model="user.phoneNumber"
              label="Phone number"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <AppInput
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralSettings } from '~/components/common/admin/GeneralSettings/general-settings.composable'

const { user, update, profileImage, updateProfileImage } = useGeneralSettings()
const profileImageRef = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  // Trigger file input click programmatically
  profileImageRef.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files ? input.files[0] : null
  if (file) {
    // Update the profile image or handle the file
    profileImage.value = URL.createObjectURL(file)
    updateProfileImage(file)
    console.log(profileImage.value)
  }
}
</script>

<style scoped lang="scss">
  .row {
    margin-top: 3rem;
  }
</style>
