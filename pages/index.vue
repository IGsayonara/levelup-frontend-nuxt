<template>
  <section class="banner-wrapper">
    <AppBanner
      description="Done by <span style='color: #ff8c00;'>Ihor Didunik</span> during fulfilment of personal development plan"
      title="Funny Self Development"
    />
  </section>
  <section>
    <div class="container">
      <div class="section-title-wrapper">
        <SectionTitle title="Mini apps" link-text="See more" @link-click="$router.push('/projects')" />
      </div>
      <ClientOnly>
        <div class="row">
          <div
              v-for="project in projects"
              :key="project.id"
              class="col-12 col-xl-6 app-card-col"
          >
            <AppCard
                :project="project"
                @click="$router.push('/project/' + project.id)"
            />
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="section-title-wrapper">
        <SectionTitle title="Learned skills" link-text="See more" />
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
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";

useHead({
  title: "Home page",
  meta: [
    { name: 'Home page', content: 'This is a dynamic page description.' }
  ]
});

import SectionTitle from '~/components/common/SectionTitle/index.vue';
import AppCard from '~/components/common/AppCard/index.vue';
import AppBanner from '~/components/common/AppBanner/index.vue';
import SkillCard from '~/components/common/SkillCard/index.vue';
import { computed } from 'vue';

const authStore = useAuthStore()
const {user} = storeToRefs(authStore);

const projects = computed(() => {
  return user.value?.projects
});

const skills = computed(() => {
  return user.value?.skills
});

</script>

<style lang="scss" scoped>
.skill-card-col,
.app-card-col {
  margin-bottom: 3rem;
}
</style>
