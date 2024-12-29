<script setup lang="ts">
import type { Project } from '~/types/project'
import { useEditProjectStore } from '~/components/common/admin/EditProject/edit-project.store'
import { useDefaultFroalaConfig } from '~/composables/froala/froala-config.composable'

const props = defineProps<{ project: Project }>()

const { config } = useDefaultFroalaConfig()

const editProjectStore = useEditProjectStore()
const { title, description } = (editProjectStore)
const { init } = editProjectStore

init(props.project?.id)
</script>

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
        <AppInput
          v-model="description"
          label="Description"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  margin: 3rem 0;
}
</style>
