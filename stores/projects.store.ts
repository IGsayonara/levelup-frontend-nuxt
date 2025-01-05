// import { ref } from 'vue'
// import type { Project } from '~/types/project'
//
// export const useProjectsStore = defineStore('projectsStore', () => {
//   const projects = ref<Project[]>([])
//   const isLoading = ref<boolean>(false)
//   const isError = ref<boolean>(false)
//   const next = ref<string | null>(null)
//
//   const loadBySearch = async (search: string) => {
//     const loadProjectsResponse = await projectUtil.loadProjects(search)
//     projects.value = loadProjectsResponse.data
//     next.value = loadProjectsResponse.links?.next || null
//   }
//
//   const loadMore = async () => {
//     if (!next.value) {
//       console.log('Nothing to load')
//       return
//     }
//
//     const loadProjectsResponse = await projectUtil.get(next.value)
//     projects.value.push(...loadProjectsResponse.data)
//     next.value = loadProjectsResponse.links?.next || null
//   }
//
//   return {
//     projects,
//     loadBySearch,
//     loadMore,
//     isError,
//     isLoading,
//   }
// })
