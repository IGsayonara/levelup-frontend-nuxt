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
      <div class="col-12">
        <AppInput
          id="project_description"
          v-model="description"
          label="Project description"
        />
      </div>
      <div class="col-12">
        <AppButton @click="update">
          Update
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditProjectStore } from '~/components/common/admin/EditProject/edit-project.store'

const props = defineProps<{ id: string }>()

const editProjectStore = useEditProjectStore()
const { title, description } = storeToRefs(editProjectStore)
const { update, init } = editProjectStore

init(props.id)
</script>

<style scoped lang="scss">

</style>
