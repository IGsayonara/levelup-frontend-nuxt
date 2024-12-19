<template>
  <div>
    <div class="row">
      <div class="col-12">
        <AppInput
          id="project_role"
          v-model="role"
          label="Role"
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
        v-for="skill in skills"
        :key="skill.id"
        class="col-6 col-md-3"
      >
        <SkillCard
          :skill="skill.skill"
          @click="editUserProjectSkillId = skill.id"
        />
      </div>
      <AppModal
        v-if="editUserProjectSkillId"
        @close="editUserProjectSkillId = null"
      >
        <template #header>
          <h2>
            {{ editUserProjectSkillTitle }}
          </h2>
        </template>
        <template #default>
          <EditUserProjectSkill
            :user-project-id="userProject.id"
            :project-skill-id="+editUserProjectSkillId"
          />
        </template>
      </AppModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDefaultFroalaConfig } from '~/composables/froala/froala-config.composable'
import type { UserProject } from '~/types/user'
import { useEditUserProjectStore } from '~/components/common/admin/EditUserProject/edit-userProject.store'

const { config } = useDefaultFroalaConfig()

const editUserProjectSkillId = ref<null | number>(null)

const props = defineProps<{ userProject: UserProject }>()

const editUserProjectStore = useEditUserProjectStore()
const { id, description, role, skills } = storeToRefs(editUserProjectStore)
const { init } = editUserProjectStore

const isAddSkillModalOpen = ref(false)

const editUserProjectSkillTitle = computed(() => {
  return skills.value.find(userProjectSkill => userProjectSkill.id === editUserProjectSkillId.value).skill.title
})

init(+props.userProject?.id)
</script>

<style scoped lang="scss">
.row {
  margin: 3rem 0;
}
</style>
