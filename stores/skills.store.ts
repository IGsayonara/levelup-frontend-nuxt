import {defineStore} from "pinia";
import {ref} from "vue"
import type {Skill} from "~/types/skill";
import {SkillUtil} from "~/utils/api/skill.util";

const skillUtil = new SkillUtil();

export const useSkillsStore = defineStore('skillsStore',  () => {
    const skills = ref<Skill[]>([])
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);

   const loadSkills = async () => {
       try{
           isLoading.value = true;
           skills.value = await skillUtil.loadSkills()
       }
       catch(error){
           console.log(error)
           isError.value = true;
       }
       finally {
           isLoading.value = false;
       }
   }

    return {
        skills,
        isLoading,
        isError,
        loadSkills,
    }
})