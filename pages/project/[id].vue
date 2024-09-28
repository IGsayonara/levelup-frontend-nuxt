<template>
  <div>
    <section>
      <div
        v-if="!isError && project"
        class="container"
      >
        <div class="section-title-wrapper">
          <SectionTitle :title="project.title" />
        </div>
        <FullAppCard :project="project" />
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
        v-if="!isError && project && project.projectSkills && project.projectSkills.length"
        class="container"
      >
        <div class="section-title-wrapper">
          <SectionTitle :title="'Related Skills'" />
        </div>
        <div class="row">
          <div
            v-for="projectSkill in project.projectSkills"
            :key="projectSkill.id"
            class="col-12 col-sm-6 col-md-3 skill-card-col mb-5"
          >
            <SkillCard
              v-if="projectSkill"
              :skill="projectSkill.skill"
              @click="selectedSkillId = projectSkill.id"
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
import type { ProjectSkill } from '~/types/project'

const route = useRoute()

const projectStore = useProjectStore()
const { isLoading, isError, project } = storeToRefs(projectStore)
const { loadProject } = projectStore

const selectedSkillId = ref<number | null>(null)

const selectedSkill = computed<ProjectSkill | null>(() => {
  if (!selectedSkillId.value) {
    return null
  }
  return project.value.projectSkills.find(projectSkill => projectSkill.id === selectedSkillId.value)
})

onMounted(() => {
  if (!project.value) {
    loadProject(route.params.id)
  }
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
