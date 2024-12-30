<template>
  <div v-if="userProject">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
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
      <div
        v-else
        class="container"
      >
        smth went wrong
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
              @click="selectedSkillId = skill.id"
            />
          </div>
        </div>
      </div>
    </section>
    <AppModal
      v-if="selectedSkillId && selectedSkill"
      @close="selectedSkillId = null"
    >
      <template #header>
        <h2>{{ selectedSkill.skill.title }}</h2>
      </template>
      <template #default>
        <div v-html="selectedSkill.description" />
      </template>
      <template #footer>
        Footer
      </template>
    </AppModal>
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

const selectedSkillId = ref<number | null>(null)

const selectedSkill = computed<UserProjectSkill | undefined>(() => {
  if (!selectedSkillId.value) {
    return
  }
  return userProject.value?.skills.find(skill => skill.id === selectedSkillId.value)
})
</script>

<style>
.skills {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
