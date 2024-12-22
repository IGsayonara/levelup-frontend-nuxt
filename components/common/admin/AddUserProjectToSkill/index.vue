<template>
  <div>
    <div class="row">
      <div class="col-12">
        <AppInput
          v-model="search"
          label="search"
        />
      </div>
      <div class="row">
        <div
          v-for="userProject in searchResults"
          :key="userProject.id"
        >
          <AppCard
            :project="userProject.project"
            class="col-md-6 col-12"
            @click="addSkillToUserProject(userProject.id, skillId)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddUserProjectSkill } from '~/components/common/admin/AddSkillToUserProject/addUserProjectSkill.composable'

const { user } = storeToRefs(useUserStore())

const props = defineProps<{ skillId: number }>()

const { addSkillToUserProject } = useAddUserProjectSkill()

const search = ref('')

const searchResults = computed(() => {
  const filteredBySearch = search.value
    ? user.value.userProjects
      .filter((userProject) => {
        return userProject.project.title.toLowerCase().includes(search.value.toLowerCase().trim())
      })
    : user.value.userProjects

  return filteredBySearch.filter((userProject) => {
    return userProject.skills.findIndex((userProjectSkill) => {
      return userProjectSkill.skill.id === props.skillId
    }) < 0
  })
})
</script>

<style scoped lang="scss">
.row{
  margin: 3rem 0;
}
.skill-button {
  margin: 1rem;
}
</style>
