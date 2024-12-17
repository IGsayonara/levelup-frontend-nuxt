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
        <AppButton
          v-for="skill in searchResults"
          :key="skill.id"
          class="col skill-button"
          @click="addUserSkill(skill.id)"
        >
          {{ skill.title }}
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddUserSkill } from '~/components/common/admin/AddUserSkill/addUserProjectSkill.composable'

const skillsStore = useSkillsStore()
const { loadSkills } = skillsStore
const { skills } = storeToRefs(skillsStore)

const { addUserSkill } = useAddUserSkill()

const search = ref('')

const searchResults = computed(() => {
  if (!search.value) {
    return skills.value.slice(0, 20)
  }

  return skills.value.filter(({ title }) => title.toLowerCase().includes(search.value.toLowerCase().trim())).slice(0, 20)
})

loadSkills()
</script>

<style scoped lang="scss">
.skill-button {
  margin: 1rem;
}
</style>
