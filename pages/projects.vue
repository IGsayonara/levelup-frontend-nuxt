<template>
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
      <div v-if="projects.length" class="row">
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
        <InfiniteLoading @infinite="loadMore" />
      </div>
      <div v-else>
        <div class="not_found_image">
          <img src="/img/404.jpg" alt="Not found any project" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InfiniteLoading from 'v3-infinite-loading';
import SectionTitle from '@/components/SectionTitle/index.vue';
import { computed, ref, watch } from 'vue';
import AppCard from '@/components/AppCard/index.vue';
import AppInput from '@/components/AppInput/index.vue';
import debounce from 'lodash.debounce';
import type {Project} from "~/types/project";

useHead({
  title: "Home page",
  meta: [
    { name: 'Home page', content: 'This is a dynamic page description.' }
  ]
});


const searchValue = ref<string>('');

const projects = computed(() => {
  return [] as Project[]
});

watch(
  searchValue,
  debounce(() => {
   console.log("implement search");
  }, 300)
);

const loadMore = () => {
  console.log("implement load more");
};
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
