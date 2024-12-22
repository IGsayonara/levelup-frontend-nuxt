<template>
  <div>
    <section v-if="user">
      <div class="container">
        <div class="user-info row row-reverse">
          <div
            class="col-12 col-sm-9"
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
              <div v-html="user.bio" />
            </div>
          </div>
          <div class="user-info__sidebar col-12 col-sm-3">
            <div class="user-info__sidebar-image">
              <NuxtImg
                :src="user.profileImage"
                :alt="user.firstName + ' ' + user.lastName"
              />
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
            title="Portfolio"
            link-text="See more"
            @link-click="$router.push('/projects')"
          />
        </div>
        <div class="row">
          <div
            v-for="project in projects"
            :key="project.id"
            class="col-12 col-xl-6 app-card-col"
          >
            <AppCard
              :project="project.project"
              @click="onProjectClick(project)"
            />
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
import type { Project } from '~/types/project'
import type { User, UserProject, UserSkill } from '~/types/user'
import type { Skill } from '~/types/skill'

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
      }
    }
  }
}

.skills{
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
