<template>
  <div>
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div v-if="userProject">
      <section>
        <div
          v-if="userProject"
          class="container"
        >
          <!--        <div class="section-title-wrapper"> -->
          <!--          <SectionTitle :title="userProject.project?.title" /> -->
          <!--        </div> -->
          <FullAppCard :user-project="userProject" />
        </div>
      </section>
      <section>
        <div class="container">
          <div class="section-title-wrapper">
            <SectionTitle :title="'Achievements'" />
          </div>
          <div v-html="userProject.description" />
        </div>
      </section>
      <section>
        <div
          v-if="userProject && userProject.skills && userProject.skills.length"
          class="container"
        >
          <div class="section-title-wrapper">
            <SectionTitle :title="'Tech stack'" />
          </div>
          <div class="skills">
            <div
              v-for="skill in userProject.skills"
              :key="skill.id"
            >
              <SkillCard
                v-if="skill"
                :skill="skill.skill"
                @click="selectedUserProjectSkillId = skill.id"
              />
            </div>
          </div>
        </div>
      </section>
      <AppModal
        v-if="selectedUserProjectSkillId && selectedUserProjectSkill"
        @close="selectedUserProjectSkillId = null"
      >
        <template #header>
          <h2>{{ selectedUserProjectSkill.skill.title }}</h2>
        </template>
        <template #default>
          <div v-html="selectedUserProjectSkill.description" />
        </template>
        <template #footer>
          <AppButton @click="$router.push(`/skill/${relatedUserSkill?.id}`)">
            Go to skill
          </AppButton>
        </template>
      </AppModal>
    </div>

    <div v-else>
      <div class="container">
        <div class="not_found_image">
          <img
            src="/img/404.jpg"
            alt="Not found any project"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import type { UserProject } from '~/types/user-project'
import type { UserProjectSkill } from '~/types/user-project-skill'

definePageMeta({
  middleware: 'fetch-user',
})

const route = useRoute()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const userProject = computed<UserProject | undefined>(() => {
  return user.value?.userProjects?.find(project => project.id === +route.params.id)
})

const breadcrumbs = ref([
  {
    to: '/', // hyperlink
    text: 'Home', // crumb text
  },
  {
    to: '/projects', // hyperlink
    text: 'Projects', // crumb text
  },
  {
    to: '/project',
    text: userProject.value?.project.title || 'Not found',
  },
])

const selectedUserProjectSkillId = ref<number | null>(null)

const selectedUserProjectSkill = computed<UserProjectSkill | undefined>(() => {
  if (!selectedUserProjectSkillId.value) {
    return
  }
  return userProject.value?.skills.find(skill => skill.id === selectedUserProjectSkillId.value)
})

const relatedUserSkill = computed(() => {
  if (selectedUserProjectSkillId.value) {
    return user.value?.userSkills.find(userSkill => +userSkill.skill.id === +selectedUserProjectSkill.value?.skill.id)
  }
  return null
})
</script>

<style>
.skills {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.not_found_image {
  display: flex;
  justify-content: center;
}
</style>
