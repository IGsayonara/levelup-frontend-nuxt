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
          id="project_title"
          v-model="description"
          label="Description"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/project'
import { useEditProjectStore } from '~/components/common/admin/EditProject/edit-project.store'

const props = defineProps<{ project?: Project }>()

const editProjectStore = useEditProjectStore()
const { title, description } = storeToRefs(editProjectStore)
const { init } = editProjectStore

init(props.project?.id)
</script>

<style scoped lang="scss">
.row {
  margin: 3rem 0;
}
</style>
