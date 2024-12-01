<template>
  <div class="mt-3">
    <div class="row">
      <div class="col-md-9">
        <div
          class="row"
        >
          <div
            v-for="userProject in user.userProjects"
            :key="userProject.id"
            class="col col-md-6"
          >
            <AppCard :project="userProject.project" />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <AppButton>Add project</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

const userStore = useUserStore()
const { user } = storeToRefs<{ user: User }>(userStore)
</script>

<style scoped lang="scss">
  .row {
    margin-top: 3rem;
  }
</style>
