<template>
  <div>
    <section>
      <div
        v-if="!isError && userProject"
        class="container"
      >
        <div class="section-title-wrapper">
          <SectionTitle :title="userProject.project?.title" />
        </div>
        <div>{{ project }}</div>
        <FullAppCard :project="userProject.project" />
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
        v-if="!isError && userProject && userProject.skills && userProject.skills.length"
        class="container"
      >
        <div class="section-title-wrapper">
          <SectionTitle :title="'Related Skills'" />
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
        <p>{{ selectedSkill.description }}</p>
      </template>
      <template #footer>
        Footer
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import type { UserProject } from '~/types/user'

const route = useRoute()

const projectStore = useProjectStore()
const { isError, project } = storeToRefs(projectStore)
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const userProject = computed<UserProject>(() => {
  return user.value?.userProjects?.find(project => project.id == route.params.id)
})

const selectedSkillId = ref<number | null>(null)

const selectedSkill = computed<Skill | null>(() => {
  if (!selectedSkillId.value) {
    return null
  }
  return userProject.value.skills.find(skill => skill.id === selectedSkillId.value)
})

onMounted(() => {

})

definePageMeta({
  breadCrumbs: [
    {
      to: '/', // hyperlink
      text: 'Home', // crumb text
    },
    {
      to: '/projects', // hyperlink
      text: 'Projects', // crumb text
    },
    {
      text: definePageMeta({
        breadCrumbs: [
          {
            to: '/', // hyperlink
            text: 'Home', // crumb text
          },
          {
            to: '/projects', // hyperlink
            text: 'Projects', // crumb text
          },
          {
            text: '/:id',
          },
        ],
      }),
    },
  ],
})
</script>
