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
        <AppButton @click="add">
          Add
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddProjectStore } from './add-project.store'

const addProjectStore = useAddProjectStore()
const { title, description } = storeToRefs(addProjectStore)
const { add } = addProjectStore
</script>

<style scoped lang="scss">

</style>
