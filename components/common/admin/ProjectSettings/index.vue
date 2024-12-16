<template>
  <div>
    <div class="row">
      <AppButton @click="isProjectModalOpen = true">
        Add project
      </AppButton>
    </div>
    <div class="row">
      <div class="col">
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
              @click="selectedProject = userProject"
            />
          </div>
        </div>
      </div>
      <AppModal
        v-if="isProjectModalOpen"
        @close="isProjectModalOpen = false"
      >
        <template #header />
        <template #default>
          <EditProject />
        </template>
      </AppModal>
      <AppModal
        v-if="selectedProject"
        @close="selectedProject = null"
      >
        <template #header>
          <h2>
            {{ selectedProjectTitle }}
          </h2>
        </template>
        <template #default>
          <EditProject :user-project="selectedProject" />
        </template>
      </AppModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, UserProject } from '~/types/user'

const userStore = useUserStore()
const { user } = storeToRefs<{ user: User }>(userStore)

const selectedProject = ref<null | UserProject>(null)

const isProjectModalOpen = ref(false)

const selectedProjectTitle = computed(() => {
  return user.value.userProjects.find(userProject => userProject.id === selectedProject.value.id).project.title
})
</script>

<style scoped lang="scss">
.row {
  margin: 3rem 0;
}
</style>
