import type {Project} from "~/types/project";
import {defineStore} from "pinia";
import {ProjectUtil} from "~/utils/project.util";
import {ref} from "vue"


export const useProjectStore = defineStore('projectStore',  () => {
    const projectUtil = new ProjectUtil();

    const projects = ref<Project[]>([])

    const loadProjects = async () => {
        projects.value = await projectUtil.loadProjects()
    }

    return {
        projects,
        loadProjects,
    }
})