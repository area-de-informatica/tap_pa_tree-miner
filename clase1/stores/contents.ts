import { defineStore } from "pinia"

interface Parameter {
  name: string
  description: string
}

interface Project {
  id: number
  title: string
  objective: string
  steps: string[]
  dataset: string
}

interface Section {
  id: number
  title: string
  content: string
  type: string
  hasVideo?: boolean
  parameters?: Parameter[]
  projects?: Project[]
  note?: string
}

interface Metadata {
  course: string
  topic: string
  version: string
  lastUpdated: string
}

interface OrangeContent {
  sections: Section[]
  metadata: Metadata
}

export const useStoreContents = defineStore("contents", {
  state: () => ({
    orangeContent: null as OrangeContent | null,
    currentSection: null as Section | null,
  }),
  actions: {
    async fetchContents() {
      try {
        const response = await $fetch("/api/contents")
        this.orangeContent = response
        this.setCurrentSection(this.orangeContent.sections[0])
      } catch (error) {
        console.error("Error fetching contents:", error)
      }
    },
    setCurrentSection(section: Section) {
      this.currentSection = { ...section }
    },
    updateSection(updatedSection: Section) {
      if (this.orangeContent) {
        // Encontrar el índice de la sección por ID
        const index = this.orangeContent.sections.findIndex((s) => s.id === updatedSection.id)
        if (index !== -1) {
          // Reemplazar la sección completa para mantener la reactividad
          this.orangeContent.sections[index] = { ...updatedSection }
          // Si la sección actual es la que se actualizó, también actualizamos currentSection
          if (this.currentSection && this.currentSection.id === updatedSection.id) {
            this.currentSection = { ...updatedSection }
          }
        }
      }
    },
    getSectionsByType(type: string) {
      if (!this.orangeContent) return []
      return this.orangeContent.sections.filter(section => section.type === type)
    },
    getProjectById(projectId: number) {
      if (!this.orangeContent) return null
      const projectsSection = this.orangeContent.sections.find(section => section.type === 'projects')
      if (projectsSection && projectsSection.projects) {
        return projectsSection.projects.find(project => project.id === projectId)
      }
      return null
    },
    getParametersSection() {
      if (!this.orangeContent) return null
      return this.orangeContent.sections.find(section => section.type === 'widget-details')
    },
  },
  /*persist: { 
    storage: process.client ? localStorage : undefined 
  }*/
})