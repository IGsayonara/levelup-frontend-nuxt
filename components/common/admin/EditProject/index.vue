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
  </div>
</template>

<script setup lang="ts">
import { useEditProjectStore } from '~/components/common/admin/EditProject/edit-project.store'
import { useDefaultFroalaConfig } from '~/composables/froala/froala-config.composable'
import type { Project } from '~/types/project'

const { config } = useDefaultFroalaConfig()

const props = defineProps<{ project: Project }>()

const editProjectStore = useEditProjectStore()
const { title, description } = storeToRefs(editProjectStore)
const { update, init } = editProjectStore

init(props.project?.id)
</script>

<style scoped lang="scss">
.row {
  margin: 3rem 0;
}
</style>
