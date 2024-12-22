<template>
  <div>
    <div class="row">
      <div class="col-12">
        <ClientOnly>
          <Froala
            id="skill_description"
            v-model:value="description"
            tag="textarea"
            label="Skill description"
            :config="config"
          />
        </ClientOnly>
      </div>
    </div>
    <div class="row">
      <AppButton @click="isAddSkillModalOpen = true">
        Connect to a project
      </AppButton>
      <AppModal
        v-if="isAddSkillModalOpen"
        @close="isAddSkillModalOpen = false"
      >
        <template #header />
        <template #default>
          <AddUserProjectToSkill :skill-id="userSkill.skill.id" />
        </template>
      </AppModal>
    </div>
    <div class="row">
      <div
        v-for="userProject in userProjects"
        :key="userProject.id"
        class="col-12 col-lg-6"
      >
        <AppCard
          :project="userProject.project"
          @click="editUserProjectId = userProject.id"
        />
      </div>
      <AppModal
        v-if="editUserProjectId"
        @close="editUserProjectId = null"
      >
        <template #header>
          <h2>
            header
          </h2>
        </template>
        <template #default>
          <EditUserProjectSkill
            :user-project-id="+editUserProjectId"
            :project-skill-id="+editUserProjectSkillId"
          />
        </template>
      </AppModal>
    </div>
    <div class="row">
      <div class="col-12">
        <AppButton @click="update">
          Update
        </AppButton>
      </div>
      <div class="col-12">
        <AppButton @click="deleteUserSkill">
          Delete
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDefaultFroalaConfig } from '~/composables/froala/froala-config.composable'
import type { UserSkill } from '~/types/user'
import { useEditUserSkillStore } from '~/components/common/admin/EditUserSkill/edit-skill.store'

const { config } = useDefaultFroalaConfig()

const editUserProjectId = ref<null | number>(null)

const props = defineProps<{ userSkill: UserSkill }>()

const editUserSkillStore = useEditUserSkillStore()
const { description, userProjects } = storeToRefs(editUserSkillStore)
const { update, init, deleteUserSkill } = editUserSkillStore

const isAddSkillModalOpen = ref(false)

const editUserProjectSkillId = computed(() => {
  const userProject = userProjects.value.find(userProject => editUserProjectId.value === userProject.id)
  return userProject.skills.find(userProjectSkill => userProjectSkill.skill.id === props.userSkill.skill.id).id
})

init(props.userSkill.id)
</script>

<style scoped lang="scss">
.row {
  margin: 3rem 0;
}
</style>
