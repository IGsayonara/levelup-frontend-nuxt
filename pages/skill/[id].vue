<template>
  <div>
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <section>
      <div
        v-if="userSkill"
        class="container"
      >
        <!--        <div class="section-title-wrapper"> -->
        <!--          <SectionTitle :title="userSkill.skill.title" /> -->
        <!--        </div> -->
        <SkillCard :skill="userSkill.skill" />
      </div>
      <div
        v-else
        class="container"
      >
        smth went wrong
      </div>
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
        <p>{{ userProjectSkill.description }}</p>
      </template>
      <template #footer>
        Footer
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import type { User, UserProject, UserSkill } from '~/types/user'
import type { Skill } from '~/types/skill'

definePageMeta({
  middleware: 'fetch-user',
})

const route = useRoute()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const userSkill = computed<UserSkill>(() => {
  return user.value?.userSkills?.find(userSkill => userSkill.id == route.params.id)
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
    text: userSkill.value.skill.title,
  },
])

const skillUserProjects = computed(() => {
  const userProjects = user.value.userProjects
  return userProjects
    .filter((userProject) => {
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
  return user.value.userProjects.find(userProject => userProject.id == selectedUserProjectId.value)
})

const userProjectSkill = computed(() => {
  return selectedUserProject.value?.skills.find(skill => skill.skill.id === userSkill.value.skill.id)
})

onMounted(() => {

})
</script>
