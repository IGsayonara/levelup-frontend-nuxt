<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6">
        <AppButton @click="isProjectModalOpen = true">
          Add project
        </AppButton>
        <AppModal
          v-if="isProjectModalOpen"
          @close="isProjectModalOpen = false"
        >
          <template #header />
          <template #default>
            <EditProject />
          </template>
        </AppModal>
      </div>
      <div class="col-12 col-md-6">
        <AppButton @click="isSkillModalOpen = true">
          Add skill
        </AppButton>
        <AppModal
          v-if="isSkillModalOpen"
          @close="isSkillModalOpen = false"
        >
          <template #header />
          <template #default>
            <AddUserSkill />
          </template>
        </AppModal>
      </div>
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
        v-if="selectedProject"
        @close="selectedProject = null"
      >
        <template #header>
          <h2>
            {{ selectedProjectTitle }}
          </h2>
        </template>
        <template #default>
          <EditUserProject :user-project="selectedProject" />
        </template>
        <template #footer>
          <div class="row">
            <AppButton
              class="col"
              @click="updateUserProject"
            >
              Update
            </AppButton>
            <AppButton
              class="col"
              @click="isProjectMO = true"
            >
              Edit Project
            </AppButton>
          </div>
        </template>
      </AppModal>
      <AppModal
        v-if="isProjectMO"
        @close="isProjectMO = false"
      >
        <template #header>
          <h2>{{ selectedProjectTitle }}</h2>
        </template>
        <template #default>
          <EditProject :project="selectedProject?.project" />
        </template>
        <template #footer>
          <AppButton @click="updateProject">
            Update
          </AppButton>
        </template>
      </AppModal>
    </div>
    <div class="row">
      <div class="col">
        <div class="row">
          <div
            v-for="userSkill in user.userSkills"
            :key="userSkill.id"
            class="col-md-3 col-6"
          >
            <SkillCard
              :skill="userSkill.skill"
              @click="selectedSkill = userSkill"
            />
          </div>
        </div>
      </div>
      <AppModal
        v-if="selectedSkill"
        @close="selectedSkill = null"
      >
        <template #header>
          <h2>
            title
          </h2>
        </template>
        <template #default>
          <EditSkill :user-skill="selectedSkill" />
        </template>
      </AppModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, UserProject, UserSkill } from '~/types/user'
import { useEditUserProjectStore } from '~/components/common/admin/EditUserProject/edit-userProject.store'
import { useEditProjectStore } from '~/components/common/admin/EditProject/edit-project.store'

const userStore = useUserStore()
const { user } = storeToRefs<{ user: User }>(userStore)

const editUserProjectStore = useEditUserProjectStore
const { update: updateUserProject } = editUserProjectStore

const editProjectStore = useEditProjectStore
const { update: updateProject } = editProjectStore

const selectedProject = ref<null | UserProject>(null)
const isProjectModalOpen = ref(false)
const isProjectMO = ref(false)

const selectedSkill = ref<null | UserSkill>(null)
const isSkillModalOpen = ref(false)

const selectedProjectTitle = computed(() => {
  return user.value.userProjects.find(userProject => userProject.id === selectedProject.value.id).project.title
})
</script>

<style scoped lang="scss">
.row {
  margin: 3rem 0;
}
</style>
