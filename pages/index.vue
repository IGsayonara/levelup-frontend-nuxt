<template>
  <div>
    <section v-if="user">
      <div class="container">
        <div class="user-info row row-reverse">
          <div
            class="user-info__bio col-12 col-sm-9"
          >
            <div class="user-info__headline">
              <h2 class="user-info__headline-title">
                {{ user.firstName + ' ' + user.lastName }}
              </h2>
              <span
                class="user-info__headline-username"
              >
                @{{ user.username }}
              </span>
            </div>
            <div class="user-info__bio">
              {{ user.bio }}
            </div>
          </div>
          <div class="user-info__sidebar col-12 col-sm-3">
            <div class="user-info__sidebar-image">
              <img
                :src="user.profileImage"
                :alt="user.firstName + ' ' + user.lastName"
              >
            </div>
            <div class="user-info__sidebar-points">
              <p>{{ user.phoneNumber }}</p>
              <p>{{ user.email }}</p>
              <p>5 years of experience</p>
              <p>3 years of Vue FE experience</p>
              <p>2 years of WordPress experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="section-title-wrapper">
          <SectionTitle
            title="Skills"
            link-text="See more"
          />
        </div>
        <ClientOnly>
          <div class="row">
            <div
              v-for="skill in skills"
              :key="skill.id"
              class="col-12 col-sm-6 col-md-3 skill-card-col"
            >
              <SkillCard :skill="skill" />
            </div>
          </div>
        </ClientOnly>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="section-title-wrapper">
          <SectionTitle
            title="Portfolio"
            link-text="See more"
            @link-click="$router.push('/projects')"
          />
        </div>
        <ClientOnly>
          <div class="row">
            <div
              v-for="project in projects"
              :key="project.project.id"
              class="col-12 col-xl-6 app-card-col"
            >
              <AppCard
                :project="project.project"
                @click="onProjectClick(project)"
              />
            </div>
          </div>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/project'

const { setProject } = useProjectStore()
const router = useRouter()

useHead({
  title: 'Home page',
  meta: [
    { name: 'Home page', content: 'This is a dynamic page description.' },
  ],
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const projects = computed(() => {
  return user.value?.userProjects
})

const skills = computed(() => {
  return user.value?.userSkills.map(({ skill }) => skill)
})

const onProjectClick = async (project: Project) => {
  setProject(project)
  await nextTick()
  await router.push('/project/' + project.project.id)
}
</script>

<style lang="scss" scoped>
.skill-card-col,
.app-card-col {
  margin-bottom: 3rem;
}

.user-info {

  @include media-breakpoint-down(sm){
    flex-direction: column-reverse;
  }

  &__headline {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;

    &-username {
      margin-left: 1rem;
    }
  }
}
</style>
