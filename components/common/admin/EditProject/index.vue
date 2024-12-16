<template>
  <div>
    <div class="row">
      <div class="col-12">
        <AppInput
          id="project_name"
          v-model="title"
          label="Project name"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ClientOnly>
          <Froala
            id="project_description"
            v-model:value="description"
            tag="textarea"
            label="Project description"
            :config="config"
          />
        </ClientOnly>
      </div>
    </div>
    <div class="row">
      <AppButton @click="isAddSkillModalOpen = true">
        Add Skill
      </AppButton>
      <AppModal
        v-if="isAddSkillModalOpen"
        @close="isAddSkillModalOpen = false"
      >
        <template #header />
        <template #default>
          <AddUserProjectSkill :user-project-id="userProject.id" />
        </template>
      </AppModal>
    </div>
    <div class="row">
      <div
        v-for="skill in projectSkills"
        :key="skill.id"
        class="col-6 col-md-3"
      >
        <SkillCard
          :skill="skill.skill"
          @click="editProjectSkillId = skill.id"
        />
      </div>
      <AppModal
        v-if="editProjectSkillId"
        @close="editProjectSkillId = null"
      >
        <template #header>
          <h2>
            {{ editUserProjectSkillTitle }}
          </h2>
        </template>
        <template #default>
          <EditUserProjectSkill
            :project-id="userProject.id"
            :project-skill-id="+editProjectSkillId"
          />
        </template>
      </AppModal>
    </div>
    <div class="row">
      <div class="col-12">
        <AppButton @click="update">
          {{ buttonText }}
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditProjectStore } from '~/components/common/admin/EditProject/edit-project.store'
import { useDefaultFroalaConfig } from '~/composables/froala/froala-config.composable'
import type { UserProject } from '~/types/user'

const { config } = useDefaultFroalaConfig()

const editProjectSkillId = ref<null | number>(null)

const props = defineProps<{ userProject: UserProject }>()

const editProjectStore = useEditProjectStore()
const { title, description, projectSkills } = storeToRefs(editProjectStore)
const { update, init } = editProjectStore

const isAddSkillModalOpen = ref(false)

const editUserProjectSkillTitle = computed(() => {
  return projectSkills.value.find(projectSkill => projectSkill.id === editProjectSkillId.value).skill.title
})

const buttonText = computed(() => {
  return props.userProject ? 'Update' : 'Add Project'
})

init(props.userProject?.project.id)
</script>

<style scoped lang="scss">
.row {
  margin: 3rem 0;
}
</style>
