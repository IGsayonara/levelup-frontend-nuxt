<template>
  <div>
    <div class="row">
      <div class="col-md-9">
        <div
          class="row"
        >
          <div
            v-for="userProject in user.userProjects"
            :key="userProject.id"
            class="col col-md-6 mb-3"
          >
            <AppCard
              :project="userProject.project"
              @click="selectedProjectId = userProject.project.id"
            />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <AppButton @click="isProjectModalOpen = true">
          Add project
        </AppButton>
        <AppModal
          v-if="isProjectModalOpen"
          @close="isProjectModalOpen = false"
        >
          <AddProject />
        </AppModal>
        <AppModal
          v-if="selectedProjectId"
          @close="selectedProjectId = null"
        >
          <EditProject :id="selectedProjectId" />
        </AppModal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

const userStore = useUserStore()
const { user } = storeToRefs<{ user: User }>(userStore)

const selectedProjectId = ref(null)

const isProjectModalOpen = ref(false)
</script>

<style scoped>

</style>
