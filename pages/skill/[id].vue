<template>
  <div v-if="userSkill">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <section>
      <div
        class="container"
      >
        <SkillCard :skill="userSkill.skill" />
      </div>
    </section>
    <section>
      <div
        class="container"
        v-html="userSkill.description"
      />
    </section>
    <section>
      <div
        v-if="skillUserProjects && skillUserProjects.length"
        class="container"
      >
        <div class="section-title-wrapper">
          <SectionTitle :title="'Related Projects'" />
        </div>
        <div class="row">
          <div
            v-for="userProject in skillUserProjects"
            :key="userProject.id"
            class="col-12 col-md-6 skill-card-col mb-5"
          >
            <AppCard
              :project="userProject.project"
              @click="selectedUserProjectId = userProject.id"
            />
          </div>
        </div>
      </div>
    </section>
    <AppModal
      v-if="selectedUserProjectId"
      @close="selectedUserProjectId = null"
    >
      <template #header>
        <h2>{{ selectedUserProject.project.title }}</h2>
      </template>
      <template #default>
        <p v-html="userProjectSkill.description" />
      </template>
      <template #footer>
        Footer
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import type { UserSkill } from '~/types/user-skill'
import type { UserProject } from '~/types/user-project'

definePageMeta({
  middleware: 'fetch-user',
})

const route = useRoute()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const userSkill = computed<UserSkill | undefined>(() => {
  return user.value?.userSkills?.find(userSkill => userSkill.id === +route.params.id)
})

const breadcrumbs = ref([
  {
    to: '/', // hyperlink
    text: 'Home', // crumb text
  },
  {
    to: '/skills', // hyperlink
    text: 'Skills', // crumb text
  },
  {
    to: '/skill',
    text: userSkill.value?.skill.title || 'Not found',
  },
])

const skillUserProjects = computed(() => {
  const userProjects = user.value?.userProjects
  return userProjects?.filter((userProject) => {
    return userProject.skills.findIndex((userProjectSkill) => {
      return userProjectSkill.skill.id === userSkill.value.skill.id
    }) >= 0
  })
})

const selectedUserProjectId = ref<number | null>(null)

const selectedUserProject = computed<UserProject | null>(() => {
  if (!selectedUserProjectId.value) {
    return null
  }

  return user.value?.userProjects.find(userProject => userProject.id == selectedUserProjectId.value) || null
})

const userProjectSkill = computed(() => {
  return selectedUserProject.value?.skills.find(skill => skill.skill.id === userSkill.value.skill.id)
})

onMounted(() => {

})
</script>
