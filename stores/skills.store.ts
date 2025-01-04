import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Skill } from '~/types/skill'
import { useNuxtApp } from '#app'

export const useSkillsStore = defineStore('skillsStore', () => {
  const { $api } = useNuxtApp()

  const skills = ref<Skill[]>([])
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)

  const loadSkills = async () => {
    try {
      isLoading.value = true
      skills.value = await $api.skills.skillControllerFindAll().then(r => r.data)
    }
    catch {
      isError.value = true
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    skills,
    isLoading,
    isError,
    loadSkills,
  }
})
