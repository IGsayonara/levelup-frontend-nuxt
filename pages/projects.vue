<template>
  <div>
    <div class="container">
      <div class="section-title-wrapper">
        <SectionTitle title="Search for projects" />
      </div>
    </div>
    <div class="projects_search">
      <div class="container">
        <AppInput
          id="searchProjectInput"
          v-model="searchValue"
          placeholder="Search"
          label="kek"
        />
      </div>
    </div>
    <section>
      <div class="container">
        <div
          v-if="searchedProjects.length"
          class="row"
        >
          <div
            v-for="project in searchedProjects"
            :key="project.id"
            class="col-12 col-xl-6 app-card-col"
          >
            <AppCard
              :project="project"
              @click="onProjectClick(project)"
            />
          </div>
        </div>
        <div v-else>
          <div class="not_found_image">
            <img
              src="/img/404.jpg"
              alt="Not found any project"
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import SectionTitle from '~/components/common/SectionTitle/index.vue'
import AppCard from '~/components/common/AppCard/index.vue'
import AppInput from '~/components/ui/AppInput/index.vue'
import type { Project } from '~/types/project'

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
  ],
})

const { setProject } = useProjectStore()
const { user } = storeToRefs(useAuthStore())
const router = useRouter()

const searchValue = ref('')
const updatedSearchValue = ref('')

const projects = computed<Project>(() => {
  return user.value?.userProjects.map(({ project }) => project) || []
})

const searchedProjects = computed(() => {
  if (!updatedSearchValue.value) {
    return projects.value
  }

  return projects.value.filter(({ title }) => title.includes(updatedSearchValue.value.trim()))
})

watch(
  searchValue,
  debounce(async () => {
    updatedSearchValue.value = searchValue.value
  }, 300),
)

onMounted(() => {
  console.log(user.value)
})

const onProjectClick = async (project: Project) => {
  setProject(project)
  await nextTick()
  await router.push('/project/' + project.id)
}
</script>

<style scoped lang="scss">
.app-card-col {
  margin-bottom: 3rem;
}

.not_found_image {
  display: flex;
  justify-content: center;
}

.projects_search {
  margin-bottom: 3rem;
}
</style>
