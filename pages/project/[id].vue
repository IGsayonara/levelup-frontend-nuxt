<template>
  <div>
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
        <div class="row">
          <div
            v-for="skill in userProject.skills"
            :key="skill.id"
            class="col-12 col-sm-6 col-md-3 skill-card-col mb-5"
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
      v-if="selectedSkillId"
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
import type { UserProject } from '~/types/user'
import type { Skill } from '~/types/skill'

definePageMeta({
  middleware: 'fetch-user',
})

const route = useRoute()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const userProject = computed<UserProject>(() => {
  return user.value?.userProjects?.find(project => project.id == route.params.id)
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
    text: userProject.value.project.title,
  },
])

const selectedSkillId = ref<number | null>(null)

const selectedSkill = computed<Skill | null>(() => {
  if (!selectedSkillId.value) {
    return null
  }
  return userProject.value.skills.find(skill => skill.id === selectedSkillId.value)
})

onMounted(() => {

})
</script>
