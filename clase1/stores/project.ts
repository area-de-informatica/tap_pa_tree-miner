import { defineStore } from "pinia"

interface Author {
  id: number
  nombre: string
}

interface ProjectData {
  autores: Author[]
  universidad: string
  programa: string
  curso: string
  año: number
  descripcion: string
}

export const useStoreProject = defineStore("project", {
  state: () => ({
    projectData: null as ProjectData | null,
    currentAuthor: null as Author | null,
  }),
  actions: {
    async fetchProjectInfo() {
      try {
        const response = await $fetch("/api/project-info")
        this.projectData = response
        this.setCurrentAuthor(this.projectData.autores[0])
      } catch (error) {
        console.error("Error fetching project info:", error)
      }
    },
    setCurrentAuthor(author: Author) {
      this.currentAuthor = { ...author }
    },
    updateAuthor(updatedAuthor: Author) {
      if (this.projectData) {
        // Encontrar el índice del autor por ID
        const index = this.projectData.autores.findIndex((a) => a.id === updatedAuthor.id)
        if (index !== -1) {
          // Reemplazar el autor completo para mantener la reactividad
          this.projectData.autores[index] = { ...updatedAuthor }
          // Si el autor actual es el que se actualizó, también actualizamos currentAuthor
          if (this.currentAuthor && this.currentAuthor.id === updatedAuthor.id) {
            this.currentAuthor = { ...updatedAuthor }
          }
        }
      }
    },
    updateProjectInfo(updatedInfo: Partial<ProjectData>) {
      if (this.projectData) {
        this.projectData = { ...this.projectData, ...updatedInfo }
      }
    },
  },
  /*persist: { 
    storage: process.client ? localStorage : undefined 
  }*/
})
