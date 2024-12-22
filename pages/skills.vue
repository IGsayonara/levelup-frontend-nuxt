<template>
  <div>
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="container">
      <div class="section-title-wrapper">
        <SectionTitle title="Search for skills" />
      </div>
    </div>
    <div class="projects_search">
      <div class="container">
        <AppInput
          id="searchProjectInput"
          v-model="searchValue"
          placeholder="Search"
        />
      </div>
    </div>
    <section>
      <div class="container">
        <div
          v-if="searchedSkills.length"
          class="row"
        >
          <div
            v-for="skill in searchedSkills"
            :key="skill.skill.id"
            class="col-12 col-sm-6 col-xl-3 app-card-col"
          >
            <SkillCard
              :skill="skill.skill"
              @click="$router.push('/skill/' + skill.id)"
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
import debounce from 'lodash.debounce'
import SectionTitle from '~/components/common/SectionTitle/index.vue'
import AppInput from '~/components/ui/AppInput/index.vue'

definePageMeta({
  middleware: 'fetch-user',
})

const breadcrumbs = ref([
  { to: '/', text: 'Home' },
  { to: '/skills', text: 'Skills' },
])

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const skills = computed(() => {
  return user.value?.userSkills || []
})

const searchValue = ref('')
const updatedSearchValue = ref('')

const searchedSkills = computed(() => {
  if (!updatedSearchValue.value) {
    return skills.value
  }

  return skills.value.filter(({ skill }) => skill.title.toLowerCase().includes(updatedSearchValue.value.trim().toLowerCase()))
})

watch(
  searchValue,
  debounce(async () => {
    updatedSearchValue.value = searchValue.value
  }, 300),
)
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
