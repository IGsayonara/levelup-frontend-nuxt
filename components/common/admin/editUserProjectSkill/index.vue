<template>
  <div>
    <div class="row">
      <div class="col-12">
        <Froala
          v-model:value="description"
          label="Skill description"
          :tag="'textarea'"
          :config="config"
        />
      </div>
    </div>
    <div class="row">
      <AppButton @click="update">
        Update
      </AppButton>
      <AppButton @click="deleteUserProjectSkill">
        Delete
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditUserProjectSkill } from '~/components/common/admin/editUserProjectSkill/edit-userProjectSkill.store'
import { useDefaultFroalaConfig } from '~/composables/froala/froala-config.composable'

const props = defineProps<{
  userProjectId: number
  projectSkillId: number
}>()

const editUserProjectSkillStore = useEditUserProjectSkill()
const { config } = useDefaultFroalaConfig()
const { init, update, delete: deleteUserProjectSkill } = editUserProjectSkillStore
const { description } = storeToRefs(editUserProjectSkillStore)

watch(props, () => {
  init(props.userProjectId, props.projectSkillId)
}, { deep: true, immediate: true })
</script>

<style scoped lang="scss">
.row{
  margin: 3rem 0;
}
</style>
