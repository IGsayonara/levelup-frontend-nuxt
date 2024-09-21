<template>
  <div class="container">
    <div class="section-title-wrapper">
      <SectionTitle title="Search for skills"/>
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
      <div v-if="searchedSkills.length" class="row">
        <div
            v-for="skill in searchedSkills"
            :key="skill.id"
            class="col-12 col-sm-6 col-xl-3 app-card-col"
        >
          <SkillCard
              :skill="skill"
              @click="$router.push('/skill/' + skill.id)"
          />
        </div>
      </div>
      <div v-else>
        <div class="not_found_image">
          <img src="/img/404.jpg" alt="Not found any project"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '~/components/common/SectionTitle/index.vue';
import AppInput from '~/components/ui/AppInput/index.vue';
import {useSkillsStore} from "~/stores/skills.store";
import {watch} from "vue";
import debounce from "lodash.debounce";

definePageMeta({
  breadCrumbs: [
    {
      to: '/', // hyperlink
      text: 'Home', // crumb text
    },
    {
      to: '/skills', // hyperlink
      text: 'Skills', // crumb text
    },
  ],
})


const skillsStore = useSkillsStore()
const {loadSkills} = skillsStore
const {skills} = storeToRefs(skillsStore)

const searchValue = ref("")
const updatedSearchValue = ref("")

const searchedSkills = computed(() => {
  if (!updatedSearchValue.value) {
    return skills.value
  }

  return skills.value.filter(({title}) => title.includes(updatedSearchValue.value.trim()))
})

watch(
    searchValue,
    debounce(async () => {
      updatedSearchValue.value = searchValue.value
    }, 300)
);


onMounted(() => {
  loadSkills()
})


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
