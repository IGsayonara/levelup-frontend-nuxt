<template>
  <div>
    <section v-if="user">
      <div class="container">
        <UserCard :user="user" />
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
        <div class="row">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            class="col-12 col-xl-6 app-card-col"
          >
            <Transition name="fade">
              <AppCard
                class="app-card"
                :project="project.project"
                @click="onProjectClick(project, index)"
              />
            </Transition>
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
            @link-click="$router.push('/skills')"
          />
        </div>
        <div class="skills">
          <div
            v-for="userSkill in skills"
            :key="userSkill"
          >
            <SkillCard
              :skill="userSkill.skill"
              @click="onSkillClick(userSkill)"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

const router = useRouter()

useHead({
  title: 'Home page',
  meta: [
    { name: 'Home page', content: 'This is a dynamic page description.' },
  ],
})

definePageMeta({
  middleware: 'fetch-user',
})

const userStore = useUserStore()
const { user } = storeToRefs<{ user: User }>(userStore)

const projects = computed<UserProject[]>(() => {
  return user.value?.userProjects.slice(0, 4) || []
})

const skills = computed<UserSkill[]>(() => {
  return user.value?.userSkills.slice(0, 16) || []
})

const onSkillClick = async (skill: UserSkill) => {
  await router.push('/skill/' + skill.id)
}

const onProjectClick = async (project: UserProject) => {
  await router.push('/project/' + project.id)
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

  &__sidebar {
    &-image {
      & > img {
        width: 100%;
        border: 1px solid #e5e5e5;
        border-radius: 25%;
      }
    }
  }

  &__sidebar-points {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem
  }
}

.skills{
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
