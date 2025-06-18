import { defineStore } from "pinia"

interface Activity {
  id: number
  title: string
  dataset: string
  datasetFile: string
  objective: string
  difficulty: string
  estimatedTime: string
  instructions: string[]
  questions: string[]
  widgets: string[]
  category: string
}

interface Category {
  id: string
  name: string
  description: string
  color: string
}

interface DifficultyLevel {
  level: string
  description: string
  color: string
}

interface Metadata {
  course: string
  topic: string
  totalActivities: number
  estimatedTotalTime: string
  version: string
  lastUpdated: string
}

interface ActivitiesData {
  activities: Activity[]
  categories: Category[]
  difficultyLevels: DifficultyLevel[]
  metadata: Metadata
}

export const useStoreActivities = defineStore("activities", {
  state: () => ({
    activitiesData: null as ActivitiesData | null,
    currentActivity: null as Activity | null,
  }),
  actions: {
    async fetchActivities() {
      try {
        const response = await $fetch("/api/activities")
        this.activitiesData = response
        this.setCurrentActivity(this.activitiesData.activities[0])
      } catch (error) {
        console.error("Error fetching activities:", error)
      }
    },
    setCurrentActivity(activity: Activity) {
      this.currentActivity = { ...activity }
    },
    updateActivity(updatedActivity: Activity) {
      if (this.activitiesData) {
        // Encontrar el índice de la actividad por ID
        const index = this.activitiesData.activities.findIndex((a) => a.id === updatedActivity.id)
        if (index !== -1) {
          // Reemplazar la actividad completa para mantener la reactividad
          this.activitiesData.activities[index] = { ...updatedActivity }
          // Si la actividad actual es la que se actualizó, también actualizamos currentActivity
          if (this.currentActivity && this.currentActivity.id === updatedActivity.id) {
            this.currentActivity = { ...updatedActivity }
          }
        }
      }
    },
    getActivitiesByCategory(categoryId: string) {
      if (!this.activitiesData) return []
      return this.activitiesData.activities.filter((activity) => activity.category === categoryId)
    },
    getActivitiesByDifficulty(difficulty: string) {
      if (!this.activitiesData) return []
      return this.activitiesData.activities.filter((activity) => activity.difficulty === difficulty)
    },
    getActivityById(activityId: number) {
      if (!this.activitiesData) return null
      return this.activitiesData.activities.find((activity) => activity.id === activityId)
    },
    getCategoryById(categoryId: string) {
      if (!this.activitiesData) return null
      return this.activitiesData.categories.find((category) => category.id === categoryId)
    },
    getDifficultyLevel(difficulty: string) {
      if (!this.activitiesData) return null
      return this.activitiesData.difficultyLevels.find((level) => level.level === difficulty)
    },
  },
  /*persist: { 
    storage: process.client ? localStorage : undefined 
  }*/
})